declare namespace Types.External {
  export interface GitHubJobs {
    total_count: number;
    jobs: Job[];
  }

  export interface Job {
    id: number;
    run_id: number;
    run_url: string;
    run_attempt: number;
    node_id: string;
    head_sha: string;
    url: string;
    html_url: string;
    status: string;
    conclusion: string;
    started_at: string;
    completed_at: string;
    name: string;
    steps: Step[];
    check_run_url: string;
    labels: string[];
    runner_id: number | null;
    runner_name: null | string;
    runner_group_id: number | null;
    runner_group_name: null | string;
  }

  export interface Step {
    name: string;
    status: string;
    conclusion: string;
    number: number;
    started_at: string;
    completed_at: string;
  }
}
