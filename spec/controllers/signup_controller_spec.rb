require 'spec_helper'

describe SignupController do

  describe "GET 'create'" do
    it "returns http success" do
      get 'create'
      response.should be_success
    end
  end

  describe "GET 'dup'" do
    it "returns http success" do
      get 'dup'
      response.should be_success
    end
  end

end
