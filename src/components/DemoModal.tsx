"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaRocket } from "react-icons/fa";
import { useModal } from "@/context/ModalContext";
import { Button } from "./ui/Button";

export default function DemoModal() {
  const { isOpen, closeModal } = useModal();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-[#111] border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="px-8 py-6 border-b border-white/5 flex justify-between items-center bg-white/5">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <FaRocket className="text-blue-500" />
              Solicitar Demo
            </h3>
            <button
              onClick={closeModal}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaTimes size={20} />
            </button>
          </div>

          {/* Form */}
          <div className="p-8 space-y-6">
            <p className="text-gray-400 text-sm">
              Déjanos tus datos y un especialista te contactará para agendar una demostración personalizada de nuestra plataforma.
            </p>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Ej. Juan Pérez"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">
                  Correo Corporativo
                </label>
                <input
                  type="email"
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="nombre@empresa.com"
                />
              </div>

               <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">
                  Empresa / Organización
                </label>
                <input
                  type="text"
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Nombre de tu organización"
                />
              </div>
            </div>

            <Button variant="solid" className="w-full py-4 text-base" onClick={closeModal}>
              Enviar Solicitud
            </Button>

            <p className="text-center text-xs text-gray-600">
              Tus datos están protegidos. No enviamos spam.
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
