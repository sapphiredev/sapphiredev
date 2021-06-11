export declare function isNullish(value: unknown): value is undefined | null;
export declare const ContinuousDeliveryWorkflow = "continuous-delivery.yml";
export declare const PublishJobName = "publish next to npm";
export declare const VerifiedSenders: Map<number, string>;
export interface PullRequestData {
    url: string;
    id: number;
    number: number;
    head: Ref;
    base: Ref;
}
interface Ref {
    ref: string;
    sha: string;
    repo: Repo;
}
interface Repo {
    id: number;
    url: string;
    name: string;
}
export {};
