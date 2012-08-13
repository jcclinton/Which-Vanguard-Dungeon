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
#puts headers

csv.each do |row|
	row = cleanRow row
	row.each do |column|
		#puts column
	end
	#puts "\n"
end
