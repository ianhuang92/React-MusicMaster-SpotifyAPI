import React, { Component } from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon, InputGroupAddon } from 'react-bootstrap';
import Profile from './Profile';
import Gallery from './Gallery';
class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            query: '',
            artist: null,
            tracks: []
        }
    }

    search() {
        console.log(this.state);
        const BASE_URL = 'https://api.spotify.com/v1/search?';
        let FETCH_URL = BASE_URL + 'q=' + this.state.query + '&type=artist&limit=1';
        const ALBUM_URL = "https://api.spotify.com/v1/artists/";
        var accessToken = 'BQAlmXMgWbT1SXEsC18lH8Um94zC0xNN4F4zCqhhzKQ6W8zjv0Ly8yF2MeTd6QwOQiI4FISCnaKCflKwfkalEi-VdutL7KbXLHceB4s7wxTgzO3NZ2knE7Iaq1aDPN913gOD40alRUgtdJNgpJDG_Ta_EBCC0hRw_XXFH_3LdkmUcqp95g&refresh_token=AQAM2x2JS_Q9cyo6mEC_uFtYAv6-Te-JhwlhY82Tw5_Z8ro1UMqTXnjG3DJr-lOGb_qfFOszjgyeN6UGK6x8cSJK81uZblSPvT95xiA0PUEUI8sRz_ZYsEG3-9aJMZPQTp0';
        var myOptions = {
            method: 'GET',
            headers: {
                'Authorization':'Bearer ' + accessToken
            },
            mode: 'cors',
            cache: 'default'
          };
        fetch(FETCH_URL, myOptions)
            .then(response => response.json())
            .then(json => {
                console.log(json);
                const artist = json.artists.items[0];
                this.setState({ artist });

                FETCH_URL = ALBUM_URL + artist.id + "/top-tracks?country=US&";
                fetch(FETCH_URL, myOptions)
                    .then(response => response.json())
                    .then(json => {
                        const tracks = json.tracks;
                        this.setState({ tracks });
                    })
            });
    }
    render() {

        return (
            <div className="App" >
                <div className="App-title" > Music Master</div>
                <FormGroup>
                    <InputGroup>
                        <FormControl type="text"
                            placeholder="Search for an Artist"
                            value={this.state.query}
                            onChange={event => { this.setState({ query: event.target.value }) }}
                            onKeyPress={event => {
                                if (event.key == 'Enter') {
                                    this.search()
                                }
                            }} />
                        <InputGroup.Addon onClick={() => this.search()} >
                            <Glyphicon glyph="search" ></Glyphicon>
                        </InputGroup.Addon>
                    </InputGroup>
                    
                </FormGroup>
                {
                    this.state.artist !== null
                        ?
                        <div>
                        <Profile artist={this.state.artist} />
                            <Gallery
                             tracks={this.state.tracks} ></Gallery> 
                    </div>    
                        
                    : <div></div>    
                }
                
            </div>
            
        )
    }
}

export default App;