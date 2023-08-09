import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { type Contract } from "@prisma/client";
import { PencilLine } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const ContractComponent = ({ contract }: { contract: Contract }) => {
  return (
    <div className="border-[rgba(0, 0, 0, 0.08)] w-full rounded-lg border bg-white">
      {/* top */}
      <div className="mt-6 flex items-center space-x-[20px] px-8">
        <div className="border-[rgba(0, 0, 0, 0.08)] flex h-[50px] w-[50px] items-center justify-center rounded-lg border-[1.5px] bg-[#f9fafb]">
          <PencilLine className="h-6 w-6" />
        </div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <h3 className="truncate text-lg font-semibold">
                {contract.name}
              </h3>
            </TooltipTrigger>
            <TooltipContent>{contract.name}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* bottom */}
      <div className="mt-8 flex flex-col space-y-[20px] px-8 pb-9 text-sm">
        <div className="flex w-full items-center justify-between">
          <span className="font-medium text-[#667085]">Status</span>
          <Badge
            variant={contract.status === "PENDING" ? "secondary" : "success"}
            className="text-sm"
          >
            {contract.status}
          </Badge>
        </div>

        <div className="flex w-full items-center justify-between">
          <span className="font-medium text-[#667085]">Created on</span>
          <p className="font-medium">{formatDate(contract.createdAt)}</p>
        </div>
      </div>
    </div>
  );
};
