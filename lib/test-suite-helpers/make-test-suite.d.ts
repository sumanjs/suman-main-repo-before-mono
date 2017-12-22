import { ITestSuite } from 'suman-types/dts/test-suite';
import { Suman } from '../suman';
export declare class TestBlockBase {
    opts: Object;
    testId: number;
    childCompletionCount: number;
    allChildBlocksCompleted: boolean;
    isSetupComplete: boolean;
    parallel: boolean;
    skipped: boolean;
    fixed: boolean;
    only: boolean;
    filename: string;
    getAfterAllParentHooks: Function;
    completedChildrenMap: Map<ITestSuite, boolean>;
    parent?: ITestSuite;
    describe: Function;
    context: Function;
    suite: Function;
    before: Function;
    beforeAll: Function;
    beforeEach: Function;
    after: Function;
    afterAll: Function;
    afterEach: Function;
    it: Function;
    test: Function;
    testBlockMethodCache: Object;
    protected mergeAfters: Function;
    protected getAfters: Function;
    protected getAfterEaches: Function;
    protected getBefores: Function;
    protected getBeforeEaches: Function;
    protected injectedValues: Object;
    protected getInjectedValue: Function;
    protected getInjections: Function;
    protected getChildren: Function;
    protected getTests: Function;
    protected getParallelTests: Function;
    protected getAftersLast: Function;
}
export interface ISumanSymbols {
    [key: string]: symbol;
}
export declare const TestBlockSymbols: ISumanSymbols;
export declare const makeTestSuite: (suman: Suman, gracefulExit: Function, handleBeforesAndAfters: Function, notifyParent: Function) => any;
