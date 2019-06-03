#!/usr/bin/env ruby



#TO GO PUBLIC, RUN:
#rvr.rb -o 0.0.0.0 -p 4567 -env production



# Start setup

puts "RVR 0.1 - Guillem Carbonell - g@ubik.bz - 2019"
require 'sinatra'



# Routes

get '/'  do
	erb :hello
end

get '/basic' do
	erb :basic
end