  function Toast(wrapperId,maskId) {
    
    this.wrapper = document.createElement('div');
    this.mask = document.createElement('div');

    this.wrapper.id = wrapperId;
    this.mask.id = maskId;
    
    document.body.appendChild(this.wrapper);
    document.body.appendChild(this.mask);

  }

  Toast.prototype.show = function (dom,duration) {

    this.duration = duration || 2000;
    this.wrapper.style.display = "block";
    this.mask.style.display = "block";
    this.wrapper.innerHTML = dom;
    setTimeout(function(){
      this.wrapper.style.display = "none";
      this.mask.style.display = "none";
    }.bind(this),this.duration);

  };

module.exports = Toast;
