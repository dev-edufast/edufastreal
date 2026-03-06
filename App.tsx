import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { GlobalContextProviders } from "./components/_globalContextProviders";
import Page_0 from "./pages/blog.tsx";
import PageLayout_0 from "./pages/blog.pageLayout.tsx";
import Page_1 from "./pages/faqs.tsx";
import PageLayout_1 from "./pages/faqs.pageLayout.tsx";
import Page_2 from "./pages/about.tsx";
import PageLayout_2 from "./pages/about.pageLayout.tsx";
import Page_3 from "./pages/admin.tsx";
import PageLayout_3 from "./pages/admin.pageLayout.tsx";
import Page_4 from "./pages/login.tsx";
import PageLayout_4 from "./pages/login.pageLayout.tsx";
import Page_5 from "./pages/_index.tsx";
import PageLayout_5 from "./pages/_index.pageLayout.tsx";
import Page_6 from "./pages/contact.tsx";
import PageLayout_6 from "./pages/contact.pageLayout.tsx";
import Page_7 from "./pages/faculty.tsx";
import PageLayout_7 from "./pages/faculty.pageLayout.tsx";
import Page_8 from "./pages/programs.tsx";
import PageLayout_8 from "./pages/programs.pageLayout.tsx";
import Page_9 from "./pages/apply-now.tsx";
import PageLayout_9 from "./pages/apply-now.pageLayout.tsx";
import Page_10 from "./pages/resources.tsx";
import PageLayout_10 from "./pages/resources.pageLayout.tsx";
import Page_11 from "./pages/e-learning.tsx";
import PageLayout_11 from "./pages/e-learning.pageLayout.tsx";
import Page_12 from "./pages/admin-login.tsx";
import PageLayout_12 from "./pages/admin-login.pageLayout.tsx";
import Page_13 from "./pages/admin.leads.tsx";
import PageLayout_13 from "./pages/admin.leads.pageLayout.tsx";
import Page_14 from "./pages/admin.users.tsx";
import PageLayout_14 from "./pages/admin.users.pageLayout.tsx";
import Page_15 from "./pages/how-it-works.tsx";
import PageLayout_15 from "./pages/how-it-works.pageLayout.tsx";
import Page_16 from "./pages/universities.tsx";
import PageLayout_16 from "./pages/universities.pageLayout.tsx";
import Page_17 from "./pages/admin.courses.tsx";
import PageLayout_17 from "./pages/admin.courses.pageLayout.tsx";
import Page_18 from "./pages/features-demo.tsx";
import PageLayout_18 from "./pages/features-demo.pageLayout.tsx";
import Page_19 from "./pages/refund-policy.tsx";
import PageLayout_19 from "./pages/refund-policy.pageLayout.tsx";
import Page_20 from "./pages/admin.programs.tsx";
import PageLayout_20 from "./pages/admin.programs.pageLayout.tsx";
import Page_21 from "./pages/blog.$blogSlug.tsx";
import PageLayout_21 from "./pages/blog.$blogSlug.pageLayout.tsx";
import Page_22 from "./pages/privacy-policy.tsx";
import PageLayout_22 from "./pages/privacy-policy.pageLayout.tsx";
import Page_23 from "./pages/admin.analytics.tsx";
import PageLayout_23 from "./pages/admin.analytics.pageLayout.tsx";
import Page_24 from "./pages/admin.dashboard.tsx";
import PageLayout_24 from "./pages/admin.dashboard.pageLayout.tsx";
import Page_25 from "./pages/book-counseling.tsx";
import PageLayout_25 from "./pages/book-counseling.pageLayout.tsx";
import Page_26 from "./pages/forgot-password.tsx";
import PageLayout_26 from "./pages/forgot-password.pageLayout.tsx";
import Page_27 from "./pages/success-stories.tsx";
import PageLayout_27 from "./pages/success-stories.pageLayout.tsx";
import Page_28 from "./pages/compare-programs.tsx";
import PageLayout_28 from "./pages/compare-programs.pageLayout.tsx";
import Page_29 from "./pages/student-verifier.tsx";
import PageLayout_29 from "./pages/student-verifier.pageLayout.tsx";
import Page_30 from "./pages/check-eligibility.tsx";
import PageLayout_30 from "./pages/check-eligibility.pageLayout.tsx";
import Page_31 from "./pages/student-dashboard.tsx";
import PageLayout_31 from "./pages/student-dashboard.pageLayout.tsx";
import Page_32 from "./pages/video-verification.tsx";
import PageLayout_32 from "./pages/video-verification.pageLayout.tsx";
import Page_33 from "./pages/admin.registrations.tsx";
import PageLayout_33 from "./pages/admin.registrations.pageLayout.tsx";
import Page_34 from "./pages/courses.$courseSlug.tsx";
import PageLayout_34 from "./pages/courses.$courseSlug.pageLayout.tsx";
import Page_35 from "./pages/freelancer-dashboard.tsx";
import PageLayout_35 from "./pages/freelancer-dashboard.pageLayout.tsx";
import Page_36 from "./pages/terms-and-conditions.tsx";
import PageLayout_36 from "./pages/terms-and-conditions.pageLayout.tsx";
import Page_37 from "./pages/admin.counseling-bookings.tsx";
import PageLayout_37 from "./pages/admin.counseling-bookings.pageLayout.tsx";
import Page_38 from "./pages/student-dashboard.settings.tsx";
import PageLayout_38 from "./pages/student-dashboard.settings.pageLayout.tsx";
import Page_39 from "./pages/e-learning.course.$courseId.tsx";
import PageLayout_39 from "./pages/e-learning.course.$courseId.pageLayout.tsx";
import Page_40 from "./pages/universities.$universitySlug.tsx";
import PageLayout_40 from "./pages/universities.$universitySlug.pageLayout.tsx";
import Page_41 from "./pages/freelancer-dashboard.students.tsx";
import PageLayout_41 from "./pages/freelancer-dashboard.students.pageLayout.tsx";
import Page_42 from "./pages/freelancer-dashboard.students.$studentId.tsx";
import PageLayout_42 from "./pages/freelancer-dashboard.students.$studentId.pageLayout.tsx";
import Page_43 from "./pages/freelancer-dashboard.students.$studentId.edit.tsx";
import PageLayout_43 from "./pages/freelancer-dashboard.students.$studentId.edit.pageLayout.tsx";

if (!window.requestIdleCallback) {
  window.requestIdleCallback = (cb) => {
    return window.setTimeout(() => cb({} as IdleDeadline), 1);
  };
}

import "./base.css";

const fileNameToRoute = new Map([["./pages/blog.tsx","/blog"],["./pages/faqs.tsx","/faqs"],["./pages/about.tsx","/about"],["./pages/admin.tsx","/admin"],["./pages/login.tsx","/login"],["./pages/_index.tsx","/"],["./pages/contact.tsx","/contact"],["./pages/faculty.tsx","/faculty"],["./pages/programs.tsx","/programs"],["./pages/apply-now.tsx","/apply-now"],["./pages/resources.tsx","/resources"],["./pages/e-learning.tsx","/e-learning"],["./pages/admin-login.tsx","/admin-login"],["./pages/admin.leads.tsx","/admin/leads"],["./pages/admin.users.tsx","/admin/users"],["./pages/how-it-works.tsx","/how-it-works"],["./pages/universities.tsx","/universities"],["./pages/admin.courses.tsx","/admin/courses"],["./pages/features-demo.tsx","/features-demo"],["./pages/refund-policy.tsx","/refund-policy"],["./pages/admin.programs.tsx","/admin/programs"],["./pages/blog.$blogSlug.tsx","/blog/:blogSlug"],["./pages/privacy-policy.tsx","/privacy-policy"],["./pages/admin.analytics.tsx","/admin/analytics"],["./pages/admin.dashboard.tsx","/admin/dashboard"],["./pages/book-counseling.tsx","/book-counseling"],["./pages/forgot-password.tsx","/forgot-password"],["./pages/success-stories.tsx","/success-stories"],["./pages/compare-programs.tsx","/compare-programs"],["./pages/student-verifier.tsx","/student-verifier"],["./pages/check-eligibility.tsx","/check-eligibility"],["./pages/student-dashboard.tsx","/student-dashboard"],["./pages/video-verification.tsx","/video-verification"],["./pages/admin.registrations.tsx","/admin/registrations"],["./pages/courses.$courseSlug.tsx","/courses/:courseSlug"],["./pages/freelancer-dashboard.tsx","/freelancer-dashboard"],["./pages/terms-and-conditions.tsx","/terms-and-conditions"],["./pages/admin.counseling-bookings.tsx","/admin/counseling-bookings"],["./pages/student-dashboard.settings.tsx","/student-dashboard/settings"],["./pages/e-learning.course.$courseId.tsx","/e-learning/course/:courseId"],["./pages/universities.$universitySlug.tsx","/universities/:universitySlug"],["./pages/freelancer-dashboard.students.tsx","/freelancer-dashboard/students"],["./pages/freelancer-dashboard.students.$studentId.tsx","/freelancer-dashboard/students/:studentId"],["./pages/freelancer-dashboard.students.$studentId.edit.tsx","/freelancer-dashboard/students/:studentId/edit"]]);
const fileNameToComponent = new Map<string, React.ComponentType<any>>([
    ["./pages/blog.tsx", Page_0],
["./pages/faqs.tsx", Page_1],
["./pages/about.tsx", Page_2],
["./pages/admin.tsx", Page_3],
["./pages/login.tsx", Page_4],
["./pages/_index.tsx", Page_5],
["./pages/contact.tsx", Page_6],
["./pages/faculty.tsx", Page_7],
["./pages/programs.tsx", Page_8],
["./pages/apply-now.tsx", Page_9],
["./pages/resources.tsx", Page_10],
["./pages/e-learning.tsx", Page_11],
["./pages/admin-login.tsx", Page_12],
["./pages/admin.leads.tsx", Page_13],
["./pages/admin.users.tsx", Page_14],
["./pages/how-it-works.tsx", Page_15],
["./pages/universities.tsx", Page_16],
["./pages/admin.courses.tsx", Page_17],
["./pages/features-demo.tsx", Page_18],
["./pages/refund-policy.tsx", Page_19],
["./pages/admin.programs.tsx", Page_20],
["./pages/blog.$blogSlug.tsx", Page_21],
["./pages/privacy-policy.tsx", Page_22],
["./pages/admin.analytics.tsx", Page_23],
["./pages/admin.dashboard.tsx", Page_24],
["./pages/book-counseling.tsx", Page_25],
["./pages/forgot-password.tsx", Page_26],
["./pages/success-stories.tsx", Page_27],
["./pages/compare-programs.tsx", Page_28],
["./pages/student-verifier.tsx", Page_29],
["./pages/check-eligibility.tsx", Page_30],
["./pages/student-dashboard.tsx", Page_31],
["./pages/video-verification.tsx", Page_32],
["./pages/admin.registrations.tsx", Page_33],
["./pages/courses.$courseSlug.tsx", Page_34],
["./pages/freelancer-dashboard.tsx", Page_35],
["./pages/terms-and-conditions.tsx", Page_36],
["./pages/admin.counseling-bookings.tsx", Page_37],
["./pages/student-dashboard.settings.tsx", Page_38],
["./pages/e-learning.course.$courseId.tsx", Page_39],
["./pages/universities.$universitySlug.tsx", Page_40],
["./pages/freelancer-dashboard.students.tsx", Page_41],
["./pages/freelancer-dashboard.students.$studentId.tsx", Page_42],
["./pages/freelancer-dashboard.students.$studentId.edit.tsx", Page_43],
  ]);

function makePageRoute(filename: string) {
  const Component = fileNameToComponent.get(filename);
  if (!Component) return null;
  return <Component />;
}

function toElement({
  trie,
  fileNameToRoute,
  makePageRoute,
}: {
  trie: LayoutTrie;
  fileNameToRoute: Map<string, string>;
  makePageRoute: (filename: string) => React.ReactNode;
}) {
  return [
    ...trie.topLevel.map((filename) => (
      <Route
        key={fileNameToRoute.get(filename)}
        path={fileNameToRoute.get(filename)}
        element={makePageRoute(filename)}
      />
    )),
    ...Array.from(trie.trie.entries()).map(([Component, child], index) => (
      <Route
        key={index}
        element={
          <Component>
            <Outlet />
          </Component>
        }
      >
        {toElement({ trie: child, fileNameToRoute, makePageRoute })}
      </Route>
    )),
  ];
}

type LayoutTrieNode = Map<
  React.ComponentType<{ children: React.ReactNode }>,
  LayoutTrie
>;
type LayoutTrie = { topLevel: string[]; trie: LayoutTrieNode };
function buildLayoutTrie(layouts: {
  [fileName: string]: React.ComponentType<{ children: React.ReactNode }> | React.ComponentType<{ children: React.ReactNode }>[];
}): LayoutTrie {
  const result: LayoutTrie = { topLevel: [], trie: new Map() };
  Object.entries(layouts).forEach(([fileName, components]) => {
    let cur: LayoutTrie = result;
    const componentList = Array.isArray(components) ? components : [components];
    for (const component of componentList) {
      if (!cur.trie.has(component)) {
        cur.trie.set(component, {
          topLevel: [],
          trie: new Map(),
        });
      }
      cur = cur.trie.get(component)!;
    }
    cur.topLevel.push(fileName);
  });
  return result;
}

function NotFound() {
  return (
    <div>
      <h1>Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <p>Go back to the <a href="/" style={{ color: 'blue' }}>home page</a>.</p>
    </div>
  );
}

import { useLocation, useNavigationType } from "react-router-dom";

export default function ScrollManager() {
  const { pathname, search, hash } = useLocation();
  const navType = useNavigationType(); // "PUSH" | "REPLACE" | "POP"

  useEffect(() => {
    // Back/forward: keep browser-like behavior
    if (navType === "POP") return;

    // Hash links: let the browser scroll to the anchor
    if (hash) return;

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, search, hash, navType]);

  return null;
}

export function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <GlobalContextProviders>
        <Routes>
          {toElement({ trie: buildLayoutTrie({
"./pages/blog.tsx": PageLayout_0,
"./pages/faqs.tsx": PageLayout_1,
"./pages/about.tsx": PageLayout_2,
"./pages/admin.tsx": PageLayout_3,
"./pages/login.tsx": PageLayout_4,
"./pages/_index.tsx": PageLayout_5,
"./pages/contact.tsx": PageLayout_6,
"./pages/faculty.tsx": PageLayout_7,
"./pages/programs.tsx": PageLayout_8,
"./pages/apply-now.tsx": PageLayout_9,
"./pages/resources.tsx": PageLayout_10,
"./pages/e-learning.tsx": PageLayout_11,
"./pages/admin-login.tsx": PageLayout_12,
"./pages/admin.leads.tsx": PageLayout_13,
"./pages/admin.users.tsx": PageLayout_14,
"./pages/how-it-works.tsx": PageLayout_15,
"./pages/universities.tsx": PageLayout_16,
"./pages/admin.courses.tsx": PageLayout_17,
"./pages/features-demo.tsx": PageLayout_18,
"./pages/refund-policy.tsx": PageLayout_19,
"./pages/admin.programs.tsx": PageLayout_20,
"./pages/blog.$blogSlug.tsx": PageLayout_21,
"./pages/privacy-policy.tsx": PageLayout_22,
"./pages/admin.analytics.tsx": PageLayout_23,
"./pages/admin.dashboard.tsx": PageLayout_24,
"./pages/book-counseling.tsx": PageLayout_25,
"./pages/forgot-password.tsx": PageLayout_26,
"./pages/success-stories.tsx": PageLayout_27,
"./pages/compare-programs.tsx": PageLayout_28,
"./pages/student-verifier.tsx": PageLayout_29,
"./pages/check-eligibility.tsx": PageLayout_30,
"./pages/student-dashboard.tsx": PageLayout_31,
"./pages/video-verification.tsx": PageLayout_32,
"./pages/admin.registrations.tsx": PageLayout_33,
"./pages/courses.$courseSlug.tsx": PageLayout_34,
"./pages/freelancer-dashboard.tsx": PageLayout_35,
"./pages/terms-and-conditions.tsx": PageLayout_36,
"./pages/admin.counseling-bookings.tsx": PageLayout_37,
"./pages/student-dashboard.settings.tsx": PageLayout_38,
"./pages/e-learning.course.$courseId.tsx": PageLayout_39,
"./pages/universities.$universitySlug.tsx": PageLayout_40,
"./pages/freelancer-dashboard.students.tsx": PageLayout_41,
"./pages/freelancer-dashboard.students.$studentId.tsx": PageLayout_42,
"./pages/freelancer-dashboard.students.$studentId.edit.tsx": PageLayout_43,
}), fileNameToRoute, makePageRoute })} 
          <Route path="*" element={<NotFound />} />
        </Routes>
      </GlobalContextProviders>
    </BrowserRouter>
  );
}
