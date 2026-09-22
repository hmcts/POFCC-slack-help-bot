const persistence = require('./persistence')
const config = require("config"); 

const SYSTEM_ACCOUNT_ID = 'SYS_ACC_ID';

describe('persistence', () => {
    let configGetSpy;
    let jiraGetCurrentUser;
    
    beforeEach(() => {
        configGetSpy = jest.spyOn(config, 'get').mockImplementation((arg) => {
            return arg === 'jira.username' ? 'J_USER' : 'API_TOKEN';
        });
        
        jiraGetCurrentUser = jest.spyOn(persistence.jira, 'getCurrentUser');
        jiraGetCurrentUser.mockReturnValue(Promise.resolve({accountId: SYSTEM_ACCOUNT_ID}));
    });

    afterEach(() => {
        configGetSpy.mockRestore();
        jiraGetCurrentUser.mockRestore();
    });

    describe('getSystemAccountId', () => {

        it('returns the system user account ID', async () => {
            let userId = await persistence.getSystemAccountId();
            expect(userId).toBe(SYSTEM_ACCOUNT_ID);
        });
    })

    describe('convertEmail', () => {

        it('returns system email if no given email', async () => {
            const getSystemAccountId = jest.spyOn(persistence, 'getSystemAccountId');
            getSystemAccountId.mockReturnValue(Promise.resolve());

            let userId = await persistence.convertEmail(null);
            expect(userId).toBe(SYSTEM_ACCOUNT_ID);

            userId = await persistence.convertEmail(undefined);
            expect(userId).toBe(SYSTEM_ACCOUNT_ID);

            getSystemAccountId.mockRestore();
        });

        it('searches for users and gets the account ID', async () => {
            const searchUsers = jest.spyOn(persistence.jira, 'searchUsers');
            searchUsers.mockReturnValue(Promise.resolve([{accountId: SYSTEM_ACCOUNT_ID}]));

            const userId = await persistence.convertEmail('bobs.uncle@hmcts.net');

            expect(userId).toBe(SYSTEM_ACCOUNT_ID);

            searchUsers.mockRestore();
        })
    })

    describe('extractJiraId', () => {
        it('extracts the key', () => {
            const actual = persistence.extractJiraIdFromBlocks([
                {},
                {},
                {},
                {},
                {
                    elements: [
                        {
                            text: 'View on Jira: <https://tools.hmcts.net/jira/browse/POFCC-61?someArg=3>'
                        }
                    ]
                }
            ])

            expect(actual).toBe('POFCC-61')
        })
    })
});


