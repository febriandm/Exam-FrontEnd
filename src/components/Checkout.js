import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Checkout extends Component {


    render() {
        return (
            <div>
            <h1 className="display-4 text-center">Checkout</h1>
            <table className="table table-hover mb-5">
                <thead>
                <tr className='text-center'>
                        <th className='text-center'>ID</th>
                        <th className='text-center'>NAME</th>                            
                        <th className='text-center'>PRICE</th>
                        <th className='text-center'>QTY</th>                      
                        <th className='text-center'>TOTAL</th>                            
                    </tr>
                </thead>
                <tbody>
                        {this.renderList}
                </tbody>
            </table>
            </div>
      
        )
    }
}

export default Checkout