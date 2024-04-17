import React from "react";
import { Link } from "react-router-dom";

function FormItemComponent({input, handleInput, handleForm}) {


    return (
        <div className="card" style={{ width: '25rem', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <div className="card-header bg-dark text-white">Add Item</div>
            <div className="card-body">
                <form onSubmit={handleForm}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            placeholder="Enter title"
                            required
                            name="title"
                            value={input.title}
                            onChange={handleInput}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Price</label>
                        <input
                            className="form-control"
                            id="description"
                            placeholder="Enter Price"
                            required
                            name="price"
                            type="number"
                            value={input.price}
                            onChange={handleInput}
                        ></input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Tag</label>
                        <input
                            className="form-control"
                            id="description"
                            placeholder="Enter Tag"
                            required
                            name="tag"
                            value={input.tag}
                            onChange={handleInput}
                        ></input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Image URL</label>
                        <input
                            className="form-control"
                            id="description"
                            placeholder="Enter Image URL"
                            required
                            name="imageUrl"
                            value={input.imageUrl}
                            onChange={handleInput}
                        ></input>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <Link to={"/"}>
                            <button className="btn btn-dark" style={{ marginRight: '5px', width: 'calc(50% - 2.5px)' }}>
                                Back
                            </button>
                        </Link>
                        
                        <button type="submit" className="btn btn-dark" style={{ width: 'calc(50% - 2.5px)' }}>
                            Submit
                        </button>
          
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FormItemComponent;