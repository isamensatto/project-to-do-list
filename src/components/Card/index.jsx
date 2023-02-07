import "./style.css";

export function Card(props) {
  return (
    <>
      <div className="card">
        <strong style={{width: '80px'}}>{props.name}</strong>
        <small>{props.time}</small>
        <button className="btn" onClick={props.onClick}>
          <img className="icon-trash" src="./img/icon-trash.svg" />
        </button>
      </div>
    </>
  );
}
