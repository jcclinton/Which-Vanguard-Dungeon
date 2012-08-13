require 'json'
require 'CSV'

def cleanRow arr
	arr.shift # removes status
	arr.pop # removes new line
	arr.pop # removes rating
	arr
end

csv = CSV.read "dungeons.csv"
headers = cleanRow csv.shift

output = Array.new

csv.each do |row|
	row = cleanRow row
	hash = Hash.new
	i = 0
	row.each do |column|
		hash[headers[i]] = column
		i = i + 1
	end
	output.push hash
end

#puts JSON.pretty_generate output
f = File.open 'dungeons.json', 'w'
f.write "var dungeonList = #{JSON.pretty_generate output};\n"
f.close
