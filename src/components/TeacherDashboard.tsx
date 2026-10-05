import React, { useState } from 'react';
import { X, GraduationCap, CheckCircle, AlertTriangle, Users, BookOpen, Award, FileSpreadsheet, Download } from 'lucide-react';

interface TeacherDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

interface StudentMastery {
  name: string;
  ageBand: string;
  sequencing: 'mastered' | 'progressing' | 'struggling';
  loops: 'mastered' | 'progressing' | 'struggling';
  conditionals: 'mastered' | 'progressing' | 'struggling';
  functions: 'mastered' | 'progressing' | 'struggling';
  dataStructures: 'mastered' | 'progressing' | 'struggling';
  efficiencyBigO: 'mastered' | 'progressing' | 'struggling';
  completedLevels: number;
}

const MOCK_CLASS_DATA: StudentMastery[] = [
  {
    name: 'Maya Lin',
    ageBand: 'Elementary (8-10)',
    sequencing: 'mastered',
    loops: 'mastered',
    conditionals: 'progressing',
    functions: 'progressing',
    dataStructures: 'struggling',
    efficiencyBigO: 'mastered',
    completedLevels: 6
  },
  {
    name: 'Leo Chen',
    ageBand: 'Middle School (11-13)',
    sequencing: 'mastered',
    loops: 'mastered',
    conditionals: 'mastered',
    functions: 'mastered',
    dataStructures: 'progressing',
    efficiencyBigO: 'mastered',
    completedLevels: 9
  },
  {
    name: 'Sophia Rodriguez',
    ageBand: 'High School (14-18)',
    sequencing: 'mastered',
    loops: 'mastered',
    conditionals: 'mastered',
    functions: 'mastered',
    dataStructures: 'mastered',
    efficiencyBigO: 'mastered',
    completedLevels: 12
  },
  {
    name: 'Jordan Brooks',
    ageBand: 'Elementary (8-10)',
    sequencing: 'mastered',
    loops: 'struggling',
    conditionals: 'struggling',
    functions: 'struggling',
    dataStructures: 'struggling',
    efficiencyBigO: 'progressing',
    completedLevels: 3
  },
  {
    name: 'Aiden Taylor',
    ageBand: 'Primary (5-7)',
    sequencing: 'mastered',
    loops: 'progressing',
    conditionals: 'struggling',
    functions: 'struggling',
    dataStructures: 'struggling',
    efficiencyBigO: 'mastered',
    completedLevels: 4
  }
];

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'matrix' | 'students' | 'rubric'>('students');

  if (!isOpen) return null;

  const renderBadge = (status: 'mastered' | 'progressing' | 'struggling') => {
    switch (status) {
      case 'mastered':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
            ● Mastered
          </span>
        );
      case 'progressing':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
            ◐ Developing
          </span>
        );
      case 'struggling':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-md">
            ▲ Needs Help
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-stone-200 w-full max-w-4xl max-h-[88vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/15 text-amber-700">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-stone-900 leading-tight">
                Educator Portal & Curriculum Dashboard
              </h2>
              <p className="text-xs text-stone-500">
                Classroom student mastery heatmaps, K-12 CS standards alignment, and grading rubrics
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Strip */}
        <div className="flex items-center gap-2 px-6 py-2.5 border-b border-stone-200 bg-stone-50/60 text-xs">
          <button
            onClick={() => setActiveTab('students')}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'students'
                ? 'bg-amber-500 text-stone-950 shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Classroom Mastery Matrix</span>
          </button>

          <button
            onClick={() => setActiveTab('matrix')}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'matrix'
                ? 'bg-amber-500 text-stone-950 shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Age-Band Curriculum Map (CSTA)</span>
          </button>

          <button
            onClick={() => setActiveTab('rubric')}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'rubric'
                ? 'bg-amber-500 text-stone-950 shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Assessment & Rubric Standards</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          {activeTab === 'students' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-stone-900">
                    Live Concept Mastery Heatmap (Period 3 CS)
                  </h3>
                  <p className="text-xs text-stone-500">
                    Tracks student performance on first attempts vs debugging iterations
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-stone-500 font-medium">5 active students</span>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto border border-stone-200 rounded-xl">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-stone-50 border-b border-stone-200 font-semibold text-stone-700">
                      <th className="py-2.5 px-3">Student</th>
                      <th className="py-2.5 px-3">Age Band</th>
                      <th className="py-2.5 px-3">Sequencing</th>
                      <th className="py-2.5 px-3">Loops</th>
                      <th className="py-2.5 px-3">Conditionals</th>
                      <th className="py-2.5 px-3">Functions</th>
                      <th className="py-2.5 px-3">Data Struct</th>
                      <th className="py-2.5 px-3">Big-O</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {MOCK_CLASS_DATA.map((s, idx) => (
                      <tr key={idx} className="hover:bg-stone-50/60">
                        <td className="py-2.5 px-3 font-bold text-stone-900">{s.name}</td>
                        <td className="py-2.5 px-3 text-stone-500">{s.ageBand}</td>
                        <td className="py-2.5 px-3">{renderBadge(s.sequencing)}</td>
                        <td className="py-2.5 px-3">{renderBadge(s.loops)}</td>
                        <td className="py-2.5 px-3">{renderBadge(s.conditionals)}</td>
                        <td className="py-2.5 px-3">{renderBadge(s.functions)}</td>
                        <td className="py-2.5 px-3">{renderBadge(s.dataStructures)}</td>
                        <td className="py-2.5 px-3">{renderBadge(s.efficiencyBigO)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Actionable Intervention Callout */}
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Pedagogical Insight:</span> 2 students (Jordan Brooks & Aiden Taylor) are stumbling on conditional branching in Level E-202 (The Golden Pancake). Recommended intervention: Review the <em>Boolean Pan Heat condition</em> during group circle time!
                </div>
              </div>
            </div>
          )}

          {activeTab === 'matrix' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-stone-900">
                Algorithm Chef CS Progression Map (CSTA Aligned)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 bg-sky-100 px-2 py-0.5 rounded">
                    Primary (Ages 5–7) · Trainee
                  </span>
                  <h4 className="text-sm font-bold text-stone-900 mt-2">Sequencing & Ordered Steps</h4>
                  <ul className="mt-2 space-y-1.5 text-xs text-stone-600 list-disc list-inside">
                    <li>Following ordered step-by-step instructions (Bread → Board → Butter)</li>
                    <li>Cause & Effect: Cannot chop without holding knife first</li>
                    <li>K-12 Benchmark: CSTA 1A-AP-08 (Model daily processes as algorithms)</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    Elementary (Ages 8–10) · Line Cook
                  </span>
                  <h4 className="text-sm font-bold text-stone-900 mt-2">Loops, Conditionals & Debugging</h4>
                  <ul className="mt-2 space-y-1.5 text-xs text-stone-600 list-disc list-inside">
                    <li>Iteration: Repeat X times to dice veggies without duplicating code</li>
                    <li>Simple if/else branching based on stove temperatures</li>
                    <li>Trace execution & fix off-by-one errors</li>
                    <li>K-12 Benchmark: CSTA 1B-AP-10 (Control structures)</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-100 px-2 py-0.5 rounded">
                    Middle School (Ages 11–13) · Sous Chef
                  </span>
                  <h4 className="text-sm font-bold text-stone-900 mt-2">Variables, Functions & Big-O Intuition</h4>
                  <ul className="mt-2 space-y-1.5 text-xs text-stone-600 list-disc list-inside">
                    <li>Authoring reusable functions (DRY modular programming)</li>
                    <li>Tracking counter variables and loop invariants</li>
                    <li>Big-O Intuition: Why linear sweep O(N) beats quadratic backtracks O(N²)</li>
                    <li>K-12 Benchmark: CSTA 2-AP-14 (Modular decomposition)</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                    High School (Ages 14–18) · Master Chef
                  </span>
                  <h4 className="text-sm font-bold text-stone-900 mt-2">Data Structures & Algorithm Patterns</h4>
                  <ul className="mt-2 space-y-1.5 text-xs text-stone-600 list-disc list-inside">
                    <li>Queues (FIFO tickets) and Stacks (LIFO burger plates)</li>
                    <li>Sorting algorithms (Bubble / Selection sort swaps)</li>
                    <li>Binary search (halving search spaces in O(log N) time)</li>
                    <li>Block-to-Text syntax bridge: Live Python & JavaScript export</li>
                    <li>K-12 Benchmark: CSTA 3A-AP-17 (Data structures & complex algorithms)</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'rubric' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-stone-900">
                Automated Rubric & Grading Criteria
              </h3>

              <div className="overflow-x-auto border border-stone-200 rounded-xl">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-stone-50 border-b border-stone-200 font-semibold text-stone-700">
                      <th className="py-2.5 px-3">Criteria</th>
                      <th className="py-2.5 px-3">1 Star (Developing)</th>
                      <th className="py-2.5 px-3">2 Stars (Proficient)</th>
                      <th className="py-2.5 px-3">3 Stars (Mastery)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    <tr>
                      <td className="py-3 px-3 font-bold text-stone-900">Correctness</td>
                      <td className="py-3 px-3 text-stone-600">Recipe finishes with minor collisions handled</td>
                      <td className="py-3 px-3 text-stone-600">All target ingredients prepared cleanly</td>
                      <td className="py-3 px-3 text-emerald-700 font-semibold">Zero collisions, perfect food state & validation</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-bold text-stone-900">Efficiency</td>
                      <td className="py-3 px-3 text-stone-600">High step count, redundant traversal</td>
                      <td className="py-3 px-3 text-stone-600">Near-optimal pathing with standard loops</td>
                      <td className="py-3 px-3 text-emerald-700 font-semibold">Matches or beats mathematical minimum steps</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3 font-bold text-stone-900">Abstraction</td>
                      <td className="py-3 px-3 text-stone-600">Repeated duplicate blocks</td>
                      <td className="py-3 px-3 text-stone-600">Employs repeat loops for repetitive chops</td>
                      <td className="py-3 px-3 text-emerald-700 font-semibold">Encapsulates routines into reusable functions</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-stone-200 bg-stone-50 flex items-center justify-between text-xs">
          <span className="text-stone-500">
            Aligned with CSTA K-12 Computer Science Standards & AP CSP Framework
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-stone-900 text-white font-semibold hover:bg-stone-800 cursor-pointer"
          >
            Close Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
