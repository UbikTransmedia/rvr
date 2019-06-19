module Randos
	def Randos.test_cube
		x = rand(11)-5
		y = rand(6)
		z = -1*rand(6)-5
		c = "%06x" % (rand * 0xffffff)
		return '<a-box position="'+x.to_s+' '+y.to_s+' '+z.to_s+'" color="#'+c+'">'
	end
end