const Shape = ({ value, onClick }) => {
    return <input className='shapes' type="button" value={value} onClick={onClick}/>;
}

export default Shape;