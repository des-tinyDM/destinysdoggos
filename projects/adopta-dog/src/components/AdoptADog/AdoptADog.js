import React, {Component} from 'react';
import axios from 'axios';
import swal from 'sweetalert2';
import './AdoptADog.css';
import AdoptedList from '../AdoptedList/AdoptedList'

class AdoptADog extends Component {
    constructor(){
        super();

        this.state = {
            dog: '',
            adoptedDogs: [],
            poundDogs: []
        }
        this.adoptThisDog = this.adoptThisDog.bind(this);
        this.abandonDog = this.abandonDog.bind(this);
        
    }
    componentDidMount() {
    this.getDog();
        // this.viewYourDogs();

    }
    getDog(){
        axios
        .get("/api/dogs/random")
        .then(response => {
            this.setState( {dog : response.data.message});
        })
    }
    // Add current dog to adopted dogs
    adoptThisDog(){
        let {dog, adoptedDogs} = this.state;
        if (JSON.stringify(adoptedDogs).includes(JSON.stringify(dog))) {
            swal("", "You already own this doggo!", "error");
            console.log(adoptedDogs);
          } else {
        axios.post("/api/dogs/", {dog: this.state.dog})
        .then(response => this.setState({ adoptedDogs:response.data}))
        .catch(error=> console.log(error));
        console.log(this.state.adoptedDogs);

          }
    }
  
    abandonDog(dog) {
        axios
          .delete(`/api/dogs/${dog}`)
          .then(response => this.setState({ adoptedDogs: response.data }))
          .catch(error => console.log(error));
      }
    
    render() {
        const {dog, adoptedDogs} = this.state;
        return (
            <div>
                <div className="dog-container">
                    <img className="adoptable-dog" src={dog} alt="Dog pic. Will you adopt or pass on this pup?"/>
                    <div className="btn-div">
                        <button className="adopt-btn btn" onClick={()=>this.adoptThisDog()}>
                            <p>Adopt Me!
                        </p></button>
                        <button className="kick-btn btn" onClick={()=>this.getDog()}>
                            <p>Kick Dog</p>
                        </button>
                    </div>
                </div>
                <AdoptedList adoptedDogs={this.state.adoptedDogs} abandonDog={this.state.abandonDog}/>
            </div>
        )
    }
}
export default AdoptADog;