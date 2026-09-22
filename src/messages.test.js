const messages = require('./messages')
const config = require("config"); 

describe("convertJiraKeyToUrl", () => {
    let configGetSpy;

    beforeEach(() => {
      configGetSpy = jest.spyOn(config, 'get');
    });

    afterEach(() => {
      configGetSpy.mockRestore();
    });

    it.each([
      [
        'https://tools.hmcts.net/jira',
        'https://tools.hmcts.net/jira/browse/TEST-1',
      ],
      [
        'https://example.atlassian.net/',
        'https://example.atlassian.net/browse/TEST-1',
      ],
    ])('uses the configured base URL', (baseUrl, expected) => {
      configGetSpy.mockReturnValue(baseUrl);

      expect(messages.convertJiraKeyToUrl('TEST-1')).toBe(expected);
      expect(configGetSpy).toHaveBeenCalledWith('jira.browse_url');
    });
});

describe('extractSlackLinkFromText', () => {
    it('returns undefined when undefined', () => {
        expect(messages.extractSlackLinkFromText(undefined)).toBe(undefined)
    })
    it('returns undefined when no match', () => {
        expect(messages.extractSlackLinkFromText("hello world")).toBe(undefined)
    })
    it('returns slack message link when found', () => {
        expect(messages.extractSlackLinkFromText("h6. _This is an automatically generated ticket created from Slack, do not reply or update in here, [view in Slack|https://platformengin-tzf2541.slack.com/archives/C01KHKNJUKE/p1611568116006500]_"))
            .toBe('https://platformengin-tzf2541.slack.com/archives/C01KHKNJUKE/p1611568116006500')
    })
})

describe('extractSlackMessageIdFromText', () => {
    it('returns undefined when undefined', () => {
        expect(messages.extractSlackMessageIdFromText(undefined)).toBe(undefined)
    })
    it('returns undefined when no match', () => {
        expect(messages.extractSlackMessageIdFromText("hello world")).toBe(undefined)
    })
    it('returns slack message id when found', () => {
        expect(messages.extractSlackMessageIdFromText("*<https://platformengin-tzf2541.slack.com/archives/C09PJD1KN20/p1611568116006500|Dummy>*\n"))
            .toBe('p1611568116006500')
    })
})
