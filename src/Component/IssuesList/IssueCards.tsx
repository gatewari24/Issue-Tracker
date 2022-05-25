import React from 'react';
import Card from '../Card/Card';
import { Issue } from '../Card/Card';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './IssueCard.css';

type Props = {
  list: Issue[];
  filterbypriority: string;
  filterbyassignee: string;
};
const IssueCards = ({ list, filterbypriority, filterbyassignee }: Props) => {
  const { t } = useTranslation();
  const [todoList, settodoList] = useState<Issue[]>([]);
  const [testing, setTesting] = useState<Issue[]>([]);
  const [inProgressList, setinProgressList] = useState<Issue[]>([]);
  const [completed, setCompleted] = useState<Issue[]>([]);
  const [filter, setFilter] = useState<Issue[]>([]);

  useEffect(() => {
    setFilter([...list]);
  }, [list]);

  useEffect(() => {
    settodoList(() => filter.filter((ele: any) => ele.status === 1));
    setinProgressList(() => filter.filter((ele: any) => ele.status === 2));
    setTesting(() => filter.filter((ele: any) => ele.status === 3));
    setCompleted(() => filter.filter((ele: any) => ele.status === 4));
  }, [filter]);
  useEffect(() => {
    if (filterbyassignee === '' && filterbypriority === '') {
      setFilter([...list]);
    } else if (filterbyassignee !== '' && filterbypriority === '') {
      setFilter([...list].filter((ele: any) => ele.assignee.id == filterbyassignee));
    } else if (filterbyassignee === '' && filterbypriority !== '') {
      setFilter([...list].filter((ele: any) => ele.priority == filterbypriority));
    } else if (filterbyassignee !== '' && filterbypriority !== '') {
      setFilter([...list].filter((ele: any) => ele.assignee.id == filterbyassignee));
      console.log(list, filter);
      setFilter([...filter].filter((ele: any) => ele.priority == filterbypriority));
    }
  }, [filterbyassignee, filterbypriority]);
  return (
    <div className="issue_status">
      <div className="issue_issue-list">
        <p className="issue_type">{t('TO DO')}</p>
        {todoList &&
          todoList.map((issue: Issue) => {
            return <Card key={issue.id} issue={issue} />;
          })}
      </div>
      <div className="issue-list">
        <p className="issue_type">{t('DEVELOPMENT')}</p>
        {inProgressList &&
          inProgressList.map((issue) => {
            return <Card key={issue.id} issue={issue} />;
          })}
      </div>
      <div className="issue-list">
        <p className="issue_type">{t('TESTING')}</p>
        {testing &&
          testing.map((issue) => {
            return <Card key={issue.id} issue={issue} />;
          })}
      </div>
      <div className="issue-list">
        <p className="issue_type">{t('COMPLETED')}</p>
        {completed &&
          completed.map((issue) => {
            return <Card key={issue.id} issue={issue} />;
          })}
      </div>
    </div>
  );
};
export default IssueCards;
