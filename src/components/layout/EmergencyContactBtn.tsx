"use client";

import { PhoneCall } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function EmergencyContactBtn() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            href="tel:999"
            className="fixed bottom-6 right-6 z-50 bg-destructive text-white rounded-full p-4 shadow-lg hover:bg-destructive/90 transition flex items-center justify-center"
            aria-label="Emergency Call"
          >
            <PhoneCall className="h-6 w-6" />
          </a>
        </TooltipTrigger>
        <TooltipContent>
          <p>Emergency Contact (999)</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
