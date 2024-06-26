import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { Proposal } from "../schemas/proposal";
import { queryKeys } from "./useLoadProposalFromQuery";

export const useRedirectToProposalWithNewParams = () => {
  const [_, setParams] = useSearchParams();

  return useCallback(
    (proposal: Proposal) => {
      if (!proposal.actions?.length) {
        return;
      }
      console.log("setting params", proposal.actions);
      setParams({
        [queryKeys.targets]: proposal.actions!.map((action) => action.to).join("|"),
        [queryKeys.calldatas]: proposal.actions!.map((action) => action.data).join("|"),
        [queryKeys.values]: proposal.actions!.map((action) => action.value).join("|"),
      });
    },
    [setParams],
  );
};
