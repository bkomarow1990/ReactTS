const CropperDialog : React.FC = () => {
    const onHandleChange = (e: EventTarget) => {

    }
    return (
        <>
        <h3>Select image</h3>
        <input type="file" name="image" id="image" className="d-none" onChange={onHandleChange}/>
        </>
    );
}