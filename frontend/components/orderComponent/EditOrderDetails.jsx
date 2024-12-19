import "./styles/editOrder.css"

export default function EditOrderDetails(){

    return(
        <div className="main-div">
            <div className="edit-div">
                <input type="text" className="adres" />
                <input type="text" className="phoneNo" />
                <input type="number" className="qty" />
                <button type="button" className="saveBtn">Save</button>
            </div>
        </div>
    )
}