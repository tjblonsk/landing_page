class SignupsController < ApplicationController
  def create
    @signup = Signup.create(signup_params)

    respond_to do |format|
      format.html {}
      format.js {}
    end
  end

  def dup
    respond_to do |format|
      if Signup.where(username: params[:username]).empty?
        format.js { render nothing: true }
      else
        format.js { render nothing: true, status: :unprocessable_entity }
      end
    end
  end


  private
    def signup_params
      params.require(:signup).permit(:email, :username)
    end
end
