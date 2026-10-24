"use client";

import React from "react";
import { Smartphone, Server, Database } from "lucide-react";
import { Stage3D, Billboard, FloorLinks, Packet3D, NodeLabel, type Point } from "./stage3d";
import { ServerBox, DbStack } from "./props3d";

const APP: Point = { x: 140, y: 380 };
const API: Point = { x: 450, y: 170 };
const DB: Point = { x: 710, y: 340 };

/** Escena en bucle (sin controles) para la página de inicio. */
export const ApiPreview: React.FC = () => (
  <div className="relative rounded-[2rem] border border-white/10 bg-gradient-to-b from-[#0A1E3B] to-[#071A35] overflow-hidden shadow-2xl shadow-black/40">
    <Stage3D label="Animación 3D: una app envía solicitudes a una API que consulta la base de datos">
      <FloorLinks links={[{ from: APP, to: API, active: true, bend: 0.12 }, { from: API, to: DB, active: true, bend: -0.12 }]} />
      <div className="absolute rounded-full border-2 border-[#19C6E6] shadow-[0_0_30px_rgba(25,198,230,0.7)]" style={{ left: APP.x - 60, top: APP.y - 60, width: 120, height: 120, transform: "translateZ(1px)" }} />
      <Billboard x={APP.x} y={APP.y} z={180}>
        <NodeLabel title="App" icon={<Smartphone />} active />
      </Billboard>
      <Billboard x={APP.x} y={APP.y} z={2}>
        <div className="w-[96px] h-[160px] rounded-[18px] border-4 border-[#1E3A5F] bg-[#040F22] p-2 space-y-1.5 shadow-xl">
          <div className="mx-auto w-8 h-2 rounded-full bg-black" />
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-1 rounded bg-white/[0.07] p-1">
              <span className="w-3.5 h-3.5 rounded bg-gradient-to-br from-[#1479D4] to-[#19C6E6]" />
              <span className="flex-1 h-1 rounded bg-white/20" />
            </div>
          ))}
        </div>
      </Billboard>
      <ServerBox x={API.x} y={API.y} active />
      <Billboard x={API.x} y={API.y} z={175}>
        <NodeLabel title="API" icon={<Server />} active />
      </Billboard>
      <DbStack x={DB.x} y={DB.y} active />
      <Billboard x={DB.x} y={DB.y} z={130}>
        <NodeLabel title="Base de datos" icon={<Database />} />
      </Billboard>
      <Packet3D from={APP} to={API} duration={2400} label="GET /productos" loop />
      <Packet3D from={API} to={DB} duration={2400} delay={800} label="SELECT" loop />
      <Packet3D from={DB} to={API} duration={2400} delay={1600} label="3 filas" color="#34d399" loop />
      <Packet3D from={API} to={APP} duration={2400} delay={2400} label="200 OK" color="#34d399" loop />
    </Stage3D>
  </div>
);
