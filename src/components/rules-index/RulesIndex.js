import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import classNames from "classnames";

import { Dialog } from "../../components/dialog";
import { Spinner } from "../../components/spinner";
import { normalizeRuleName } from "../../utils/string";
import { closeRulesIndex } from "../../state/rules-index";

import { rulesMap, synonyms, sixthRulesMap } from "./rules-map";
import "./RulesIndex.css";

export const RulesIndex = () => {
  const { listId } = useParams();
  const list = useSelector((state) => state.lists.find(({ id }) => listId === id));

  const { open, activeRule } = useSelector((state) => state.rulesIndex);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const handleClose = () => {
    setIsLoading(true);
    dispatch(closeRulesIndex());
  };

  const normalizedName = normalizeRuleName(activeRule);
  const synonym = synonyms[normalizedName];
  let ruleData = rulesMap[normalizedName] || rulesMap[synonym];
  if ( list.game == "warhammer-fantasy-6" ) {
    ruleData = sixthRulesMap[normalizedName] || sixthRulesMap[synonym];
  } else if ( list.game == "warhammer-fantasy-8" ) {
    // TBD
  }
  const rulePath = ruleData?.url;
  
  let gameMode = "tow"
  if ( list.game == "warhammer-fantasy-6" ) {
    gameMode = "6th"
  } else if ( list.game == "warhammer-fantasy-8" ) {
    gameMode = "8th"
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      {rulePath ? (
        <>
          <iframe
            onLoad={() => setIsLoading(false)}
            className={classNames(
              "rules-index__iframe",
              !isLoading && "rules-index__iframe--show"
            )}
            src={`https://${gameMode}.whfb.app/${rulePath}?minimal=true&utm_source=owb&utm_medium=referral`}
            title="Warhammer: The Old World Online Rules Index"
            height="500"
            width="700"
          />
          {isLoading && <Spinner className="rules-index__spinner" />}
        </>
      ) : (
        <p>
          <FormattedMessage id="editor.noRuleFound" />
        </p>
      )}
    </Dialog>
  );
};
