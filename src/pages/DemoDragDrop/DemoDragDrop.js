import React, { useRef, useState } from "react";
import "./DemoDragDrop.css";
import { useSpring, animated } from "react-spring";
const defaultValue = [
  { id: 1, taskName: "Task 1" },
  { id: 2, taskName: "Task 2" },
  { id: 3, taskName: "Task 3" },
  { id: 4, taskName: "Task 4" },
  { id: 5, taskName: "Task 5" },
];
/*ádadwawd */
export default function DemoDragDrop(props) {
  const [taskList, setTaskList] = useState(defaultValue);
  const tagDrag = useRef({});
  const tagDragEnter = useRef({});

  // Animation usePring
  const [propsSpring, set, stop] = useSpring(() => ({
    from: {
      bottom: -25,
    },
    to: {
      bottom: 0,
    },
    config: { duration: 250 },

    reset: true,
  }));
  const handleDragStart = (e, task, index) => {
    console.log("tag", e.target);
    console.log("task", task);
    // Lưu lại giá trị của task đang drag
    tagDrag.current = task;
  };
  const handleDragEnter = (e, taskDragEnter, index) => {
    // console.log("tag", e.target);
    // console.log("task", task);
    set({ bottom: 0 });
    // Lưu lại giá trị của task kéo được kéo ngang qua
    tagDragEnter.current = taskDragEnter;
    let taskListUpdate = [...taskList];

    // Lấy ra index thằng đang kéo
    let indexDragTag = taskListUpdate.findIndex(
      (task) => task.id === tagDrag.current.id
    );

    // Lấy ra index thằng bị kéo qua
    let indexDragEnter = taskListUpdate.findIndex(
      (task) => task.id === taskDragEnter.id
    );

    let temp = taskListUpdate[indexDragTag];
    taskListUpdate[indexDragTag] = taskListUpdate[indexDragEnter];
    taskListUpdate[indexDragEnter] = temp;
    setTaskList(taskListUpdate);
  };
  const handleDragOver = (e) => {
    // console.log("DrapOver", e.target);
  };
  const handleDragEnd = (e) => {};
  const handleDragDrop = (e) => {
    // console.log("DrapDrop", e.target);
  };
  return (
    <div
      className="container"
      onDragOver={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      onDrop={(e) => {
        console.log("DrapEnd", e.target);
        tagDrag.current = {};

        setTaskList([...taskList]);
      }}
    >
      <h1 className="text-center mt-4">Task List</h1>
      <div className="row">
        <div className="col-2"></div>
        <div className="col-8 bg-dark text-light p-4">
          {taskList.map((task, index) => {
            let cssDragTag = task.id === tagDrag.current.id ? "dragTag" : "";
            if (task.id === tagDragEnter.current.id) {
              return (
                <animated.div
                  style={{
                    position: "relative",
                    bottom: propsSpring.bottom.to(
                      (numberBottom) => `${numberBottom}px`
                    ),
                  }}
                  onDragStart={(e) => {
                    handleDragStart(e, task, index);
                  }}
                  onDragEnter={(e) => handleDragEnter(e, task, index)}
                  onDragEnd={handleDragEnd}
                  draggable
                  key={index}
                  className={`bg-success p-4 m-2 ${cssDragTag}`}
                >
                  {task.taskName}
                </animated.div>
              );
            }
            return (
              <div
                onDragStart={(e) => {
                  handleDragStart(e, task, index);
                }}
                onDragEnd={handleDragEnd}
                onDragEnter={(e) => handleDragEnter(e, task, index)}
                draggable
                key={index}
                className={`bg-success p-4 m-2 ${cssDragTag}`}
              >
                {task.taskName}
              </div>
            );
          })}
        </div>
        <div className="col-2 bg-primary" style={{ height: "450px" }}></div>
      </div>
    </div>
  );
}
