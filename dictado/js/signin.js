export default class SignIn {
  constructor(parentElement) {
    this.parentElement = parentElement;
    this.signin = document.querySelector("#signIn");
    this.submitBtn = document.querySelector("#submitBtn");
    this.formElement = parentElement.firstElementChild;
    this.submitBtn.addEventListener("click", this.submit.bind(this));
    this.parentElement.style.display = "none";
    this.constructSignIn(this.signin);
  }

  constructSignIn(signInButton) {
    signInButton.addEventListener("click", () => {
      this.parentElement.style.display = "block";
      signInButton.innerHTML = "";
    });
  }

  submit(e) {
    e.preventDefault();
    console.log(e,this.submitBtn)
  }
}
