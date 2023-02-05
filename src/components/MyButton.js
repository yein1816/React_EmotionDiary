const MyButton = ({ text, type, onClick }) => {

    const btnType = ['positive', 'negative'].includes(type) ? type : 'default';
    //type이 포지티브,네거티브 둘중에 하나가 있냐 있으면 그 타입으로 반환하고, 없으면 디폴트 값으로 무조건 반환

    return (
        <button className={["MyButton", `MyButton_${btnType}`].join(" ")}
            onClick={onClick}>
            {text}
        </button>
    );
};

MyButton.defaultProps = {
    type: 'default',
}

export default MyButton;