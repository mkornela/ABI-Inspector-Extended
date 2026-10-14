(() => {
  "use strict";
  // Runs in the extension's isolated world before the Overview UI mounts.
  const fields = {
    userJudgeSummary: ["season_total_case_num", "season_right_case_num", "season_wrong_case_num", "season_right_punish_case_num", "season_accuracy", "life_accuracy", "life_wrong_case_num", "day_judged_num", "day_permit_num"],
    userWeekJudgeSummary: ["week_total_num", "week_right_num", "week_wrong_num", "week_right_punish_num"],
    userGrowthSummary: ["ret_exp_level", "total_exp", "level_got_exp", "exp_step", "exp_process"],
  };
  window.__abiOverviewData = {};
  window.addEventListener("message", (event) => {
    if (event.source !== window || event.origin !== location.origin || event.data?.type !== "abi:overview-data") return;
    const incoming = event.data.data;
    if (!incoming || typeof incoming !== "object") return;
    for (const [group, names] of Object.entries(fields)) {
      if (!incoming[group] || typeof incoming[group] !== "object") continue;
      const values = {};
      for (const name of names) {
        const value = incoming[group][name];
        if (typeof value === "number" && Number.isFinite(value) && value >= 0) values[name] = value;
      }
      window.__abiOverviewData[group] = values;
    }
    document.dispatchEvent(new Event("abi:overview-updated"));
  });
})();

