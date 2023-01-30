import React, { useEffect, useState } from "react";
import { IHistory, IHistoryTableItem } from "../../models";
import { createLocationQuery, getHistory } from "../../utils/_helpers";
import "./history.scss";
import { Link } from "react-router-dom";
import ShareButton from "../../components/share-button/share-button";

function History() {
  const [history, setHistory] = useState<IHistoryTableItem[]>([]);
  useEffect(() => {
    let localHistory = getHistory();
    const historyTable = localHistory.map((item: IHistory) => {
      return {
        date: new Date(item.date_selected).toDateString(),
        title: item.q.split("+").join(" ").slice(0, 60),
        full_title: item.q.split("+").join(" "),
        link: createLocationQuery(item),
      };
    });
    historyTable.reverse();
    setHistory(historyTable);
  }, []);

  return (
    <div className="history container">
      <Link to={"/"} className="fit-content btn btn--subtleHover">
        {"< Back"}
      </Link>
      <h1>History</h1>
      <ul className="history__tab">
        {history.map((item: IHistoryTableItem, index: number) => {
          return (
            <li className="history__tab__item" key={index}>
              <span className="history__tab__item__date"> {item.date}</span>
              <span
                className="history__tab__item__title"
                title={item.full_title}
              >
                {item.title}
              </span>
              <ShareButton link={item.link} />
              <Link to={item.link} className="btn btn--secondary">
                Visit
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default History;
