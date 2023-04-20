import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";

export default function InterviewerList(props) {
  const interviewers = props.interviewers.map(interviewer => {
    return (
      
        <InterviewerListItem 
          key={interviewer.id}  
          selected={interviewer.id === props.interviewer}
          setInterviewer={props.setInterviewer} 
          {...interviewer} 
        />
      
  
    )
    });


  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  );

}