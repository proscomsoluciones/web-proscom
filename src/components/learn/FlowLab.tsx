"use client";

/**
 * Laboratorio genérico de "flujo paso a paso": escenarios + pasos + escena 3D.
 * Cada tema entrega sus escenarios y una función que dibuja la escena según el paso actual.
 */
import React, { useState } from "react";
import { Stage3D, Packet3D, type Point } from "./stage3d";
import { useStepPlayer, ScenarioPicker, PlayerControls, StepTimeline, Narration, type CodeSnippet, type ScenarioOption } from "./lab-ui";

export interface FlowPacket {
  from: string;
  to: string;
  label: string;
  color?: string;
  delay?: number;
}

export interface FlowStep {
  title: string;
  text: string;
  tip?: string;
  active: string[];
  packets?: FlowPacket[];
  code?: CodeSnippet;
  tone?: "ok" | "error";
  /** Datos libres que usa la escena (estado de pantallas, insignias, etc.) */
  state?: Record<string, string | boolean | number>;
}

export interface FlowScenario extends ScenarioOption {
  steps: FlowStep[];
}

interface FlowLabProps {
  scenarios: FlowScenario[];
  positions: Record<string, Point>;
  stageLabel: string;
  intro: { title: string; text: string };
  playLabel?: string;
  scenarioLabel?: string;
  stepMs?: number;
  renderScene: (ctx: { step: FlowStep | null; scenario: string; isActive: (id: string) => boolean; stepIndex: number }) => React.ReactNode;
}

export const FlowLab: React.FC<FlowLabProps> = ({ scenarios, positions, stageLabel, intro, playLabel, scenarioLabel, stepMs = 3000, renderScene }) => {
  const [scenarioId, setScenarioId] = useState(scenarios[0].id);
  const scenario = scenarios.find((s) => s.id === scenarioId) ?? scenarios[0];
  const steps = scenario.steps;
  const player = useStepPlayer(steps.length, stepMs);
  const cur = player.step >= 0 ? steps[player.step] : null;
  const isActive = (id: string) => !!cur?.active.includes(id);

  return (
    <div className="lab-frame rounded-[2rem] bg-gradient-to-b from-[#0A1E3B] to-[#071A35] border border-white/10 shadow-2xl shadow-[#071A35]/40 overflow-hidden">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 sm:p-6 lg:py-4 border-b border-white/10">
        <ScenarioPicker
          label={scenarioLabel}
          options={scenarios.map(({ id, label, hint, tone }) => ({ id, label, hint, tone }))}
          value={scenarioId}
          onChange={(id) => {
            setScenarioId(id);
            player.reset();
          }}
        />
        <PlayerControls player={player} total={steps.length} playLabel={playLabel} />
      </div>

      <div className="lab-main grid grid-cols-1 lg:grid-cols-12">
        <div className="lab-stage lg:col-span-7 xl:col-span-8 relative border-b lg:border-b-0 lg:border-r border-white/10">
          <Stage3D label={stageLabel}>
            {renderScene({ step: cur, scenario: scenarioId, isActive, stepIndex: player.step })}
            {cur?.packets?.map((p, i) => (
              <Packet3D
                key={`${scenarioId}-${player.step}-${i}`}
                from={positions[p.from]}
                to={positions[p.to]}
                duration={1600}
                delay={p.delay}
                label={p.label}
                color={p.color}
              />
            ))}
          </Stage3D>
        </div>
        <div className="lab-narration lg:col-span-5 xl:col-span-4 p-5 sm:p-6 min-h-[300px] lg:min-h-0" aria-live="polite">
          <Narration
            stepIndex={player.step}
            total={steps.length}
            title={cur ? cur.title : intro.title}
            text={cur ? cur.text : intro.text}
            tip={cur?.tip}
            code={cur?.code}
            tone={cur?.tone}
          />
        </div>
      </div>

      <div className="px-5 sm:px-6 py-4 lg:py-3 border-t border-white/10">
        <StepTimeline steps={steps.map((s) => ({ title: s.title, tone: s.tone === "error" ? "error" : undefined }))} current={player.step} onSelect={player.goto} />
      </div>
    </div>
  );
};
