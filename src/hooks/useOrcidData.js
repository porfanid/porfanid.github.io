import { useEffect, useState } from "react";
import { fetchWithCache } from "./fetchWithCache.js";

const ORCID_API = "https://pub.orcid.org/v3.0";

function formatDate(d) {
  if (!d) return null;
  const year = d.year?.value;
  if (!year) return null;
  const month = d.month?.value;
  if (!month) return year;
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  return `${monthNames[parseInt(month, 10) - 1] || ""} ${year}`.trim();
}

function parseAffiliationGroup(json, summaryKey, type) {
  const groups = json?.["affiliation-group"] || [];
  return groups
    .map((g) => g.summaries?.[0]?.[summaryKey])
    .filter(Boolean)
    .map((s) => {
      const start = formatDate(s["start-date"]);
      const end = formatDate(s["end-date"]);
      const period = start ? `${start} \u2014 ${end || "Present"}` : end || "";
      return {
        type,
        title: s["role-title"] || s.organization?.name || type,
        org: s.organization?.name || "",
        department: s["department-name"] || "",
        period,
        sortKey: s["start-date"]?.year?.value || "0",
        description: [s["department-name"], s.organization?.name].filter(Boolean).join(" \u00b7 "),
      };
    });
}

export function useOrcidData(orcidId) {
  const [state, setState] = useState({ loading: true, error: null, stale: false, timeline: [] });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [empRes, eduRes] = await Promise.all([
          fetchWithCache(`${ORCID_API}/${orcidId}/employments`, { key: `orcid-emp-${orcidId}` }),
          fetchWithCache(`${ORCID_API}/${orcidId}/educations`, { key: `orcid-edu-${orcidId}` }),
        ]);

        if (cancelled) return;

        const employments = parseAffiliationGroup(empRes.data, "employment-summary", "Experience");
        const educations = parseAffiliationGroup(eduRes.data, "education-summary", "Education");

        const timeline = [...employments, ...educations].sort(
          (a, b) => parseInt(b.sortKey, 10) - parseInt(a.sortKey, 10)
        );

        setState({
          loading: false,
          error: null,
          stale: empRes.stale || eduRes.stale,
          timeline,
        });
      } catch (err) {
        if (!cancelled) {
          setState((s) => ({ ...s, loading: false, error: err.message }));
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [orcidId]);

  return state;
}
