import "./styles.css";
import { FiPlus, FiMinus } from "react-icons/fi";
import React from "react";

const faqs = [
  {
    question: "What are the symptoms of COVID-19?",
    answer:
      "Common symptoms of COVID-19 include fever, cough, and difficulty breathing. Other symptoms may include fatigue, muscle or body aches, headache, sore throat, loss of taste or smell, congestion or runny nose, nausea or vomiting, and diarrhea.",
  },
  {
    question: "How can I protect myself from identity theft?",
    answer:
      "To protect yourself from identity theft, you can safeguard your personal information by using strong, unique passwords for online accounts, being cautious about sharing personal information online, monitoring your financial accounts regularly for any suspicious activity, and using security software on your devices.",
  },
  {
    question: "What are the symptoms of a heart attack?",
    answer:
      "Common symptoms of a heart attack include chest pain or discomfort, upper body pain or discomfort in the arms, back, neck, jaw, or upper stomach, shortness of breath, nausea, lightheadedness, or cold sweats. However, symptoms can vary from person to person.",
  },
];

export default function App() {
  const [active, setActive] = React.useState(null);

  return (
    <div className="App">
      {faqs.map((faq, index) => (
        <Accordion
          {...faq}
          index={index}
          active={active}
          setActive={setActive}
        />
      ))}
    </div>
  );
}

function Accordion(props) {
  let isActive = props.index === props.active;

  function handleClick() {
    isActive ? props.setActive(null) : props.setActive(props.index);
  }

  return (
    <div className={`accordion${isActive ? "-active" : ""}`}>
      <div className="question">
        <div className="question-group">
          <div className={`number${isActive ? "-active" : ""}`}>
            0{props.index + 1}
          </div>
          <div className={`statement${isActive ? "-active" : ""}`}>
            {props.question}
          </div>
        </div>
        {isActive ? (
          <FiMinus onClick={handleClick} />
        ) : (
          <FiPlus onClick={handleClick} />
        )}
      </div>
      {isActive ? <div className="answer">{props.answer}</div> : null}
    </div>
  );
}
