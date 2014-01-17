class SignupsController < ApplicationController
  def create
    @signup = Signup.create(signup_params)

    respond_to do |format|
      format.html {}
      format.js { render json: @signup }
    end
  end

  def dup
    respond_to do |format|
      if Signup.where(username: params[:username]).empty?
        format.js { render json: { status: 'OK' } }
      else
        format.js { render json: { status: 'DUP' }, status: :unprocessable_entity }
      end
    end
  end


  private
    def signup_params
      params.require(:signup).permit(:email, :username)
    end
end
