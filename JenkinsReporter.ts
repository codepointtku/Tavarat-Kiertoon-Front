import { Reporter, TestCase, TestResult } from '@playwright/test/reporter';
import config from './playwright.config';

const fs = require('fs');
const ansiRegex = new RegExp(
    '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)|(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))',
    'g'
);
class JenkinsReporter implements Reporter {
    printsToStdio(): boolean {
        return false;
    }

    onTestEnd(test: TestCase, result: TestResult) {
        // to keep error messages minimal, only print error message after last retry fails.
        if (result.status === 'failed' && result.retry == config.retries) {
            const message = result.error?.message?.replace(ansiRegex, '');
            fs.writeFileSync(
                'test-result.txt',
                `test "${test.title}" ${result.status}: ${message?.substring(0, message?.indexOf('Call log:'))} `
            );
        }
    }
}

export default JenkinsReporter;
