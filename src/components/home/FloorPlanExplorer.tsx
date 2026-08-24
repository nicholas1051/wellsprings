"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { HousingUnit } from "@/data/properties";
import { cn } from "@/lib/utils";

interface FloorPlanExplorerProps {
  unit: HousingUnit;
}

export function FloorPlanExplorer({ unit }: FloorPlanExplorerProps) {
  const [activeFloor, setActiveFloor] = useState<"ground" | "first">("ground");
  const [activeRoom, setActiveRoom] = useState<string | null>(null);

  const groundRooms = unit.rooms.filter((r) => r.floor === "ground");
  const firstRooms = unit.rooms.filter((r) => r.floor === "first");
  const currentRooms = activeFloor === "ground" ? groundRooms : firstRooms;
  const hasFirstFloor = unit.floorPlanFirst && firstRooms.length > 0;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-navy mb-6">Interactive Floor Plan</h2>

      {hasFirstFloor && (
        <div className="mb-6 flex gap-2" role="tablist" aria-label="Floor level">
          <button
            type="button"
            role="tab"
            aria-selected={activeFloor === "ground"}
            onClick={() => { setActiveFloor("ground"); setActiveRoom(null); }}
            className={cn(
              "rounded-full px-5 py-2.5 text-sm font-semibold transition-all",
              activeFloor === "ground" ? "bg-navy text-white" : "bg-cream text-navy hover:bg-tint",
            )}
          >
            Ground Floor
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeFloor === "first"}
            onClick={() => { setActiveFloor("first"); setActiveRoom(null); }}
            className={cn(
              "rounded-full px-5 py-2.5 text-sm font-semibold transition-all",
              activeFloor === "first" ? "bg-navy text-white" : "bg-cream text-navy hover:bg-tint",
            )}
          >
            First Floor
          </button>
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
        <div className="relative overflow-hidden rounded-2xl border border-grey-line bg-white">
          <div className="relative aspect-[4/3] bg-gradient-to-br from-tint/50 to-cream">
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-sm text-text-grey/60 font-medium">
                {activeFloor === "ground" ? "Ground Floor" : "First Floor"} Plan
              </p>
            </div>

            {currentRooms.map((room, index) => {
              const cols = Math.ceil(Math.sqrt(currentRooms.length));
              const col = index % cols;
              const row = Math.floor(index / cols);
              const isActive = activeRoom === room.id;

              return (
                <motion.button
                  key={room.id}
                  type="button"
                  className={cn(
                    "absolute rounded-lg border-2 transition-colors text-xs font-bold",
                    isActive
                      ? "border-brand-blue bg-brand-blue/20 text-brand-blue z-10"
                      : "border-brand-blue/30 bg-brand-blue/10 text-brand-blue hover:border-brand-blue hover:bg-brand-blue/20",
                  )}
                  style={{
                    left: `${10 + (col * 80) / cols}%`,
                    top: `${10 + (row * 80) / Math.ceil(currentRooms.length / cols)}%`,
                    width: `${70 / cols}%`,
                    height: `${70 / Math.ceil(currentRooms.length / cols)}%`,
                  }}
                  onClick={() => setActiveRoom(isActive ? null : room.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label={`${room.name}: ${room.area}m²`}
                >
                  <span className="block truncate px-2 py-1">{room.name}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-navy mb-3">Room Legend</h3>
          <div className="space-y-2">
            {currentRooms.map((room) => (
              <motion.button
                key={room.id}
                type="button"
                className={cn(
                  "flex w-full items-center justify-between rounded-xl border p-3 text-left transition-all",
                  activeRoom === room.id
                    ? "border-brand-blue bg-brand-blue/10"
                    : "border-grey-line bg-white hover:bg-cream",
                )}
                onClick={() => setActiveRoom(activeRoom === room.id ? null : room.id)}
                whileHover={{ x: 2 }}
              >
                <span className="text-sm font-medium text-navy">{room.name}</span>
                <span className="text-sm font-bold text-brand-blue">{room.area}m&sup2;</span>
              </motion.button>
            ))}
          </div>

          <AnimatePresence>
            {activeRoom && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="mt-4 rounded-xl bg-navy p-4 text-white"
              >
                {(() => {
                  const room = currentRooms.find((r) => r.id === activeRoom);
                  if (!room) return null;
                  return (
                    <>
                      <p className="font-bold">{room.name}</p>
                      <p className="text-sm text-white/70 mt-1">{room.area}m&sup2; &bull; {activeFloor === "ground" ? "Ground" : "First"} Floor</p>
                    </>
                  );
                })()}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-4 rounded-xl bg-cream p-4">
            <p className="text-xs text-text-grey">
              Total floor area: <span className="font-bold text-navy">{unit.floorAreaSqm}m&sup2;</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
