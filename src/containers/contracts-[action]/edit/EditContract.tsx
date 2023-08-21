import React from "react";
import { ContractTitleEditor } from "@/containers/contracts-[action]/components/ContractTitleEditor";
import { ContractEditor } from "@/containers/contracts-[action]/components/ContractEditor/ContractEditor";
import { ContractSigners } from "@/containers/contracts-[action]/components/ContractSigners/ContractSigners";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useLeavePageConfirm } from "@/hooks/useLeavePageConfirm";
import { type ContractFormData } from "@/containers/contracts-[action]/components/ContractSigners/interface";
import { api } from "@/utils/api";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/router";
import { routes } from "@/routes";
import { type SingleContractType } from "@/pages/contracts/edit/[id]";
import { ContractSignersFooter } from "@/containers/contracts-[action]/components/ContractSigners/ContractSignersFooter";

export const EditContractPage = ({
  contract,
}: {
  contract?: SingleContractType | null;
}) => {
  const { toast } = useToast();
  const router = useRouter();

  const {
    mutate: updateContract,
    isLoading: updateContractLoading,
    isSuccess: hideConfirmationWhenContractIsCreatedSuccessfully,
  } = api.contract.update.useMutation({
    onSuccess() {
      toast({
        title: "Success",
        description: "Contract updated successfully",
      });

      void router.push(routes.contracts.all());
    },
    onError() {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    },
  });

  useLeavePageConfirm({
    message:
      "Are you sure you want to leave this page? you still have unsaved changes",
    isConfirm: !hideConfirmationWhenContractIsCreatedSuccessfully,
  });

  const onSubmit: SubmitHandler<ContractFormData> = (data) => {
    updateContract({
      id: contract?.id || "",
      contractName: data.contractName,
      contractContent: data.contractContent,
    });
  };

  const { handleSubmit, register, control } = useForm<ContractFormData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ContractTitleEditor contract={contract} register={register} />
      <ContractEditor contract={contract} control={control} />
      <ContractSigners
        contract={contract}
        register={register}
        isLoading={updateContractLoading}
        disabled
      >
        <ContractSignersFooter
          isLoading={updateContractLoading}
          action="Update Contract"
          disabled={contract?.status === "SIGNED"}
        />
      </ContractSigners>
    </form>
  );
};
