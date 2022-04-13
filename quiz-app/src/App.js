import logo from "./logo.svg";
import "./App.css";
import { CSVLink } from "react-csv";
import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button, Container } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function App() {
  let allQuestions = [
    {
      num: 1,
      question: "Caring for people who have suffered is an important virtue.",
    },
    {
      num: 2,
      question:
        "I believe that compassion for those who are suffering is one of the most crucial virtues.",
    },
    {
      num: 3,
      question: "We should all care for people who are in emotional pain.",
    },
    {
      num: 4,
      question:
        "I am empathetic toward those people who have suffered in their lives.",
    },
    {
      num: 5,
      question:
        "Everyone should try to comfort people who are going through something hard.",
    },
    {
      num: 6,
      question:
        "It pains me when I see someone ignoring the needs of another human being.",
    },
    {
      num: 7,
      question:
        "The world would be a better place if everyone made the same amount of money.",
    },
    {
      num: 8,
      question:
        "Our society would have fewer problems if people had the same income.",
    },
    {
      num: 9,
      question:
        "I believe that everyone should be given the same quantity of resources in life.",
    },
    {
      num: 10,
      question:
        "I believe it would be ideal if everyone in society wound up with roughly the same amount of money.",
    },
    {
      num: 11,
      question:
        "When people work together toward a common goal, they should share the rewards equally, even if some worked harder on it.",
    },
    {
      num: 12,
      question:
        "I get upset when some people have a lot more money than others in my country.",
    },
    {
      num: 13,
      question:
        "I think people who are more hard-working should end up with more money.",
    },
    {
      num: 14,
      question:
        "I think people should be rewarded in proportion to what they contribute.",
    },
    {
      num: 15,
      question:
        "The effort a worker puts into a job ought to be reflected in the size of a raise they receive.",
    },
    {
      num: 16,
      question: "It makes me happy when people are recognized on their merits.",
    },
    {
      num: 17,
      question:
        "In a fair society, those who work hard should live with higher standards of living.",
    },
    {
      num: 18,
      question: "I feel good when I see cheaters get caught and punished.",
    },
    {
      num: 19,
      question:
        "I think children should be taught to be loyal to their country.",
    },
    {
      num: 20,
      question: "It upsets me when people have no loyalty to their country.",
    },
    { num: 21, question: "Everyone should love their own community." },
    {
      num: 22,
      question: "Everyone should defend their country, if called upon. ",
    },
    {
      num: 23,
      question:
        "Everyone should feel proud when a person in their community wins in an international competition.",
    },
    {
      num: 24,
      question:
        "I believe the strength of a sports team comes from the loyalty of its members to each other.",
    },
    {
      num: 25,
      question:
        "I think it is important for societies to cherish their traditional values.",
    },
    {
      num: 26,
      question:
        "I feel that most traditions serve a valuable function in keeping society orderly",
    },
    {
      num: 27,
      question: "I think obedience to parents is an important virtue. ",
    },
    { num: 28, question: "We all need to learn from our elders. " },
    {
      num: 29,
      question:
        "I believe that one of the most important values to teach children is to have respect for authority.",
    },
    {
      num: 30,
      question: "I think having a strong leader is good for society.",
    },
    {
      num: 31,
      question:
        "I think the human body should be treated like a temple, housing something sacred within.",
    },
    { num: 32, question: "I believe chastity is an important virtue." },
    {
      num: 33,
      question:
        "It upsets me when people use foul language like it is nothing.",
    },
    {
      num: 34,
      question:
        "If I found out that an acquaintance had an unusual but harmless sexual fetish I would feel uneasy about them",
    },
    {
      num: 35,
      question:
        "People should try to use natural medicines rather than chemically identical human-made ones.",
    },
    {
      num: 36,
      question: "I admire people who keep their virginity until marriage.",
    },
  ];

  const [count, setCount] = useState({});
  const [questions, setQuestion] = useState([]);
  const [show, setShow] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [minOption, setMinOption] = useState("");
  const [maxOption, setMaxOption] = useState("");

  const headers = [
    { label: "Question Number", key: "num" },
    { label: "Question", key: "question" },
    { label: "Active", key: "active" },
    { label: "Choice", key: "choice" },
  ];

  const csvReport = {
    filename: "Responses.csv",
    headers: headers,
    data: questions,
  };

  const handleClose = () => setShow(false);

  const selectRandomQuestions = () => {
    const shuffledQuestions = allQuestions.sort(() => 0.5 - Math.random());

    let selected = shuffledQuestions.slice(0, 10);
    for (let i = 0; i < 10; i++) {
      setQuestion((questions) => [
        ...questions,
        {
          num: selected[i].num,
          question: selected[i].question,
          choice: "None",
        },
      ]);
    }
  };

  const setOption = (id, option) => {
    questions.map((c) => {
      if (c.num === id) {
        c.active = option;
      }
    });
    setQuestion((questions) => [...questions]);

    console.log(questions);
  };
  const postChoices = async () => {
    setEndTime(Date.now());
    const temp = {};
    for (let i = 0; i < questions.length; i++) {
      temp[questions[i].active] = temp[questions[i].active]
        ? temp[questions[i].active] + 1
        : 1;
    }
    let entries = Object.entries(temp);
    let minOptionCount = 11;
    let maxOptionCount = -1;

    for (let [index, [key, value]] of entries.entries()) {
      if (value < minOptionCount) {
        console.log("Going in min", key, value);
        minOptionCount = value;
        setMinOption((minOption) => [key, value]);
      }

      if (value > maxOptionCount) {
        console.log("Going in max", key, value);
        maxOptionCount = value;
        setMaxOption((maxOption) => [key, value]);
      }
    }

    console.log("Values");
    console.log(maxOption, minOption);

    setCount(temp);
    setShow(true);

    try {
      await axios.post("http://localhost:5001/api/choices", {
        questions,
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setStartTime(Date.now());
    selectRandomQuestions();
  }, []);

  return (
    <div className="App">
      <h1 className="text-white"> The MOLA Quiz</h1>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thank you for taking the Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col className="m-2" xs={12} md={8}>
                Time taken: {Math.floor((endTime - startTime) / 1000)} sec{" "}
              </Col>
            </Row>
            <Row>
              <Col className="m-2" xs={5} md={4}>
                Most Chosen: {maxOption[0]}
              </Col>
              <Col className="m-2" xs={5} md={4}>
                Least Chosen: {minOption[0]}
              </Col>
            </Row>
            <Row>
              <Col className="m-2" xs={5} md={4}>
                Count: {maxOption[1]}
              </Col>
              <Col className="m-2" xs={5} md={4}>
                Count: {minOption[1]}
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <CSVLink {...csvReport}> Download your Responses </CSVLink>

          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {questions.map((q) => {
        return (
          <div>
            <Card id={q.num} className="m-4">
              <Card.Header>{q.question} </Card.Header>
              <Card.Body>
                <Button
                  variant="primary"
                  className={
                    q.active === "Strongly Disagree" ? "selected m-3" : "m-3"
                  }
                  onClick={() => setOption(q.num, "Strongly Disagree")}
                >
                  Strongly Disagree
                </Button>
                <Button
                  variant="primary"
                  onClick={() => setOption(q.num, "Disagree")}
                  className={q.active === "Disagree" ? "selected m-3" : "m-3"}
                >
                  Disagree
                </Button>
                <Button
                  variant="primary"
                  className={
                    q.active === "Slightly Disagree" ? "selected m-3" : "m-3"
                  }
                  onClick={() => setOption(q.num, "Slightly Disagree")}
                >
                  Slightly Disagree
                </Button>
                <Button
                  variant="primary"
                  className={q.active === "Neutral" ? "selected m-3" : "m-3"}
                  onClick={() => setOption(q.num, "Neutral")}
                >
                  Neutral
                </Button>
                <Button
                  variant="primary"
                  className={
                    q.active === "Slightly Agree" ? "selected m-3" : "m-3"
                  }
                  onClick={() => setOption(q.num, "Slightly Agree")}
                >
                  Slightly Agree
                </Button>
                <Button
                  variant="primary"
                  className={q.active === "Agree" ? "selected m-3" : "m-3"}
                  onClick={() => setOption(q.num, "Agree")}
                >
                  Agree
                </Button>
                <Button
                  variant="primary"
                  className={
                    q.active === "Strongly Agree" ? "selected m-3" : "m-3"
                  }
                  onClick={() => setOption(q.num, "Strongly Agree")}
                >
                  Strongly Agree
                </Button>
              </Card.Body>
            </Card>
          </div>
        );
      })}
      <Button variant="primary" className="m-3" onClick={postChoices}>
        Finish
      </Button>
    </div>
  );
}

export default App;
