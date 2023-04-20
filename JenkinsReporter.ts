import { FullConfig, FullResult, Reporter, Suite, TestCase, TestResult } from '@playwright/test/reporter';
import config from './playwright.config';
class JenkinsReporter implements Reporter {
    /* onBegin(config: FullConfig, suite: Suite) {
        console.log(`Starting the run with ${suite.allTests().length} tests`);
    } */

    onTestEnd(test: TestCase, result: TestResult) {
        // to keep error messages minimal, only print error message after last retry fails.
        if (result.status === 'failed' && result.retry == config.retries) {
            const message = result.error?.message;
            console.log(
                `test "${test.title}" ${result.status}: ${message?.substring(0, message?.indexOf('Call log:'))}`
            );
        }
    }

    /*  onEnd(result: FullResult) {
        console.log(`Finished the run: ${result.status}`);
    } */
}

export default JenkinsReporter;
