import React from 'react';
import './App.css';
import { CartaoComponente } from './Componentes/CartaoComponente/CartaoComponente';

class App extends React.Component {
  state = { posts: [ ]}

public componentDidMount(): void {
  this.carregarInfo()
}

public carregarInfo = async() => {
  let postGet = fetch('https://jsonplaceholder.typicode.com/posts')
  let photoGet = fetch('https://jsonplaceholder.typicode.com/photos')
  let [ posts, photos ] = await Promise.all([ postGet, photoGet ])
  let postsJSON = await posts.json()
  let photoJSON = await photos.json()

  let postAndPhotos = postsJSON.map(( post: any, index: string | number ) => {
    return { ...post, cover: photoJSON[ index ].url }
  })
  this.setState({ posts: postAndPhotos})
}

  render() {
    let { posts } = this.state;
    return (
      <section className='container'>
        <div className="posts">
          {posts.map(post => (
            <CartaoComponente key={post['id']} post={ post }/>
          ))}
        </div>
      </section>
    );
  }
}

export default App;
