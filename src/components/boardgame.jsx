import Shape from "./shape";
const BoardGame = ({ shapes, onClick }) => {
    return (<div className="board-game">
        {shapes.map((shape, index) => (
            <Shape key={index} value={shape} onClick={() => onClick(index)} />
        ))}
    </div>);
}

export default BoardGame;