import React, { Component } from 'react'
import Axios from 'axios';
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'


class Cart extends Component {


    state = {
        cart: []
    }

    componentDidMount () {
        Axios.get(
            'http://localhost:2022/Cart'
        ).then (res => {
            this.setState({
                cart: res.data
            })
            console.log(this.state.cart);
            
        })
        
    }

    getCart = () => {
        Axios.get(
            'http://localhost:2022/Cart',
        ).then (res => {
            this.setState({
                cart: res.data
            })
        } )
    }

    deleteCart = (item) => {
        var ID = item.id

        Axios.delete(
            'http://localhost:2022/Cart/' + ID,
        ).then(res => {
            console.log('Deleted sucessfully');
            console.log({cart: res.data});


            this.getCart()
            
        })
    }



    procTotalQty = () => {
        var totalQty = 0
        var cart = this.state.cart.map(item => {
            return {
                qty: item.inputCart
            }
        })


        for( var i = 0; i < this.state.cart.length; i++){
            totalQty += parseInt(cart[i].qty)
        }

        return (<td>{totalQty}</td>)

    }


    procTotalPrice = () => {
        var totalPrice = 0
        var cart = this.state.cart.map(item => {
            return {
                price: item.productPrice
            }
        })

        for (let i = 0; i < this.state.cart.length; i++) {
            totalPrice += parseInt(cart[i].price)
            
        }
        return (<td>{totalPrice}</td>)
    }

    renderList = () => {

        return this.state.cart.map( item => {
            console.log(item)
            if(item.idUser === this.props.user.id){
                return (
                    <tr>
                        <td className='text-center'>{item.idUser}</td>
                        <td className='text-center'>{item.productName}</td>
                        <td className='text-center'>{item.productPrice}</td>
                        <td className='text-center'>{item.inputCart}</td>
                        <td className='text-center'>
                            <img src={item.inputPict} className='' width='50px'></img>
                        </td>
                        <td className='text-center'>
                            <button className='btn btn-outline-primary ml-2'onClick = { () => {this.deleteCart(item)}} > Delete</button>
                        </td>     
                        
                    </tr> 
                )                        

            }
                
        })
    }



    render(){
        return(
            <div className="container">
                <div className=''>
                    <Link to={'/'}>
                    <button className ='btn btn-outline-primary mt-2'>Continue Shopping</button>
                    </Link>
                    
                </div>
                <h1 className="display-4 text-center">Cart</h1>
                <table className="table table-hover mb-5">
                    <thead>
                    <tr className='text-center'>
                            <th className='text-center'>ID</th>
                            <th className='text-center'>NAME</th>                            
                            <th className='text-center'>PRICE</th>
                            <th className='text-center'>QTY</th>
                            <th className='text-center'>PICTURE</th>
                            <th className='text-center'>ACTION</th>                            
                        </tr>
                    </thead>
                    <tbody>
                            {this.renderList()}
                    </tbody>
                </table>
                <button className='btn btn-outline-primary mt-2 ml-2'>Checkout</button>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        user: state.auth // {id, username}
    }
}

export default connect(mapStateToProps)(Cart) 