class SignupsController < ApplicationController
  def create
    @signup = Signup.create(signup_params)

    respond_to do |format|
      format.html {}
      format.js {}
    end
  end

  def dup
  end


  private
    def signup_params
      params.require(:signup).permit(:email, :username)
    end
end
