import React from 'react'
import './style.css';
import Header from './../Header'
function Blogs({user}) {
    return (
        
           <>
           <Header user={user}/>
           <div class="container">
  <div class="text-center">
    <h1>Bootstrap card tiled layout</h1>
  </div>
  <div class="container">
    <div class="card-columns">
      {/* <div class="card">
       
        <img class="card-img-top" src="https://images.unsplash.com/photo-1535025639604-9a804c092faa?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6cb0ceb620f241feb2f859e273634393&auto=format&fit=crop&w=500&q=80" alt="Card image cap"/>
        <div class="card-body">
          <h5 class="card-title">Lorem ipsum dolor sit amet.</h5>
          <p class="card-text">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusantium ad alias, aliquid amet aspernatur atque culpa cum debitis dicta doloremque, dolorum ea eos et excepturi explicabo facilis harum illo impedit incidunt laborum laudantium...
          </p>
          <p class="card-text"><small class="text-muted"><i class="fas fa-eye"></i>1000<i class="far fa-user"></i>admin<i class="fas fa-calendar-alt"></i>Jan 20, 2018</small></p>
      </div>
      
      
        
        </div> */}
        </div>
      </div>
      <div class="card">
        
        <img class="card-img-top navbar-brand" src="https://images.unsplash.com/photo-1472076638602-b1f8b1ac0b4a?ixlib=rb-0.3.5&s=63c9de7246b535be56c8eaff9b87dd89&auto=format&fit=crop&w=500&q=80" alt="Card image cap"/>
        <div class="card-body">
          <h5 class="card-title">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur, doloremque!</h5>
          <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio iusto maxime nemo omnis praesentium similique.</p>
        </div>
      </div>
      <div class="card">
        
        <img class="card-img-top navbar-brand" src="https://images.unsplash.com/photo-1535086181678-5a5c4d23aa7d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=34c86263bec2c8f74ceb74e9f4c5a5fc&auto=format&fit=crop&w=500&q=80" alt="Card image cap"/>
        <div class="card-body">
          <h5 class="card-title">Lorem ipsum dolor sit amet, consectetur.</h5>
          <p class="card-text">Amet commodi deleniti enim laboriosam odio placeat praesentium quis ratione rerum suscipit.</p>
        </div>
      </div>
      <div class="card">
    
        <img class="card-img-top navbar-brand" src="https://images.unsplash.com/photo-1535074153497-b08c5aa9c236?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d2aaf944a59f16fe1fe72f5057b3a7dd&auto=format&fit=crop&w=500&q=80" alt="Card image cap"/>
        <div class="card-body">
          <h5 class="card-title">Lorem ipsum dolor sit amet, consectetur.</h5>
          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        </div>
      </div>
      <div class="card">
        
        <img class="card-img-top navbar-brand" src="https://images.unsplash.com/photo-1535124406821-d2848dfbb25c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=98c434d75b44c9c23fc9df2a9a77d59f&auto=format&fit=crop&w=500&q=80" alt="Card image cap"/>
        <div class="card-body">
          <h5 class="card-title">Lorem ipsum dolor sit amet.</h5>
          <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. At, consequatur culpa cumque deserunt dignissimos error explicabo fugiat harum ipsam magni minus mollitia nemo perferendis qui repellendus rerum saepe vel voluptate voluptatem voluptatum!
            Aperiam, labore, molestiae!..</p>
        </div>
      </div>
      <div class="card">
        
        <img class="card-img-top navbar-brand" src="https://images.unsplash.com/photo-1508015926936-4eddcc6d4866?ixlib=rb-0.3.5&s=10b3a8717ab609be8d7786cab50c4e0b&auto=format&fit=crop&w=500&q=80" alt="Card image cap"/>
        <div class="card-body">
          <h5 class="card-title">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h5>
          <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque commodi debitis eaque explicabo fuga maiores necessitatibus, neque omnis optio vel!</p>
        </div>
      </div>
    </div>
  
     </>       
    )
}

export default Blogs
