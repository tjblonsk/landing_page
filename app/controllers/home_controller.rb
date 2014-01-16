class HomeController < ApplicationController
  def index
    @signup = Signup.new
  end
end
