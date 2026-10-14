(() => {
  "use strict";
  // Runs in the page world. Observe existing XHR completions only: never send
  // extra requests, change arguments, replace responses, or submit verdicts.
  const fields = {
    userJudgeSummary: ["season_total_case_num", "season_right_case_num", "season_wrong_case_num", "season_right_punish_case_num", "season_accuracy", "life_accuracy", "life_wrong_case_num", "day_judged_num", "day_permit_num"],
    userWeekJudgeSummary: ["week_total_num", "week_right_num", "week_wrong_num", "week_right_punish_num"],
    userGrowthSummary: ["ret_exp_level", "total_exp", "level_got_exp", "exp_step", "exp_process"],
  };
  const send = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.send = function (...args) {
    const read = () => {
      try {
        const url = new URL(this.responseURL);
        if (url.origin !== "https://sg-apps.vasdgame.com" || url.pathname !== "/ide/" || this.status !== 200) return;
        const body = this.responseType === "json" ? this.response :
          (!this.responseType || this.responseType === "text") ? JSON.parse(this.responseText) : null;
        if (!body || Number(body.ret) !== 0 || !body.jData || Number(body.jData.iRet) !== 0) return;
        const data = {};
        for (const [group, names] of Object.entries(fields)) {
          const source = body.jData[group];
          if (!source || typeof source !== "object") continue;
          data[group] = {};
          for (const name of names) {
            const value = source[name];
            if (typeof value === "number" && Number.isFinite(value) && value >= 0) data[group][name] = value;
          }
        }
        if (Object.keys(data).length) window.postMessage({ type: "abi:overview-data", data }, location.origin);
      } catch { /* A non-JSON response must not affect the official request. */ }
    };
    this.addEventListener("load", read, { once: true });
    try { return Reflect.apply(send, this, args); }
    catch (error) { this.removeEventListener("load", read); throw error; }
  };
})();

