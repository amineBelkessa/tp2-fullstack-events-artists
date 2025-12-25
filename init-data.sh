#!/bin/sh
# init-data.sh - Script to seed the database with real artists and events

echo "🚀 Starting database initialization..."
echo "⏳ Waiting for backend to be fully ready..."
sleep 15

BASE_URL="http://backend:8080"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "${BLUE}================================================${NC}"
echo "${BLUE}  Creating 30+ Artists${NC}"
echo "${BLUE}================================================${NC}"

# Create Artists Array
create_artist() {
  name=$1
  echo "${YELLOW}📝 Creating artist: $name...${NC}"
  response=$(curl -s -X POST "${BASE_URL}/artists" \
    -H 'Content-Type: application/json' \
    -d "{\"label\": \"$name\"}")
  artist_id=$(echo $response | grep -o '"id":"[^"]*"' | cut -d'"' -f4)
  echo "${GREEN}✅ Created: $name (ID: ${artist_id})${NC}"
  echo $artist_id
}

# Rock/Metal Artists
ARTIST_1=$(create_artist "Metallica")
ARTIST_2=$(create_artist "Iron Maiden")
ARTIST_3=$(create_artist "AC/DC")
ARTIST_4=$(create_artist "Guns N' Roses")
ARTIST_5=$(create_artist "Foo Fighters")
ARTIST_6=$(create_artist "Red Hot Chili Peppers")
ARTIST_7=$(create_artist "Queen")
ARTIST_8=$(create_artist "The Rolling Stones")
ARTIST_9=$(create_artist "Led Zeppelin")
ARTIST_10=$(create_artist "Pink Floyd")

# Modern Rock/Alternative
ARTIST_11=$(create_artist "Imagine Dragons")
ARTIST_12=$(create_artist "Muse")
ARTIST_13=$(create_artist "Arctic Monkeys")
ARTIST_14=$(create_artist "The Killers")
ARTIST_15=$(create_artist "Coldplay")

# Heavy Metal
ARTIST_16=$(create_artist "Slayer")
ARTIST_17=$(create_artist "Megadeth")
ARTIST_18=$(create_artist "Anthrax")
ARTIST_19=$(create_artist "Pantera")
ARTIST_20=$(create_artist "Black Sabbath")

# Hard Rock
ARTIST_21=$(create_artist "Aerosmith")
ARTIST_22=$(create_artist "Van Halen")
ARTIST_23=$(create_artist "Bon Jovi")
ARTIST_24=$(create_artist "Deep Purple")
ARTIST_25=$(create_artist "Judas Priest")

# Alternative/Indie
ARTIST_26=$(create_artist "Radiohead")
ARTIST_27=$(create_artist "The Strokes")
ARTIST_28=$(create_artist "Kings of Leon")
ARTIST_29=$(create_artist "The White Stripes")
ARTIST_30=$(create_artist "Franz Ferdinand")

# Electronic/Dance
ARTIST_31=$(create_artist "Daft Punk")
ARTIST_32=$(create_artist "The Chemical Brothers")
ARTIST_33=$(create_artist "David Guetta")
ARTIST_34=$(create_artist "Calvin Harris")
ARTIST_35=$(create_artist "Tiësto")

echo ""
echo "${BLUE}================================================${NC}"
echo "${BLUE}  Creating 30+ Events${NC}"
echo "${BLUE}================================================${NC}"

# Create Events
create_event() {
  name=$1
  start=$2
  end=$3
  place=$4
  echo "${YELLOW}📝 Creating event: $name...${NC}"
  response=$(curl -s -X POST "${BASE_URL}/events" \
    -H 'Content-Type: application/json' \
    -d "{
      \"label\": \"$name\",
      \"startDate\": \"$start\",
      \"endDate\": \"$end\",
      \"place\": \"$place\"
    }")
  event_id=$(echo $response | grep -o '"id":"[^"]*"' | cut -d'"' -f4)
  echo "${GREEN}✅ Created: $name (ID: ${event_id})${NC}"
  echo $event_id
}

# Major Music Festivals - Europe
EVENT_1=$(create_event "Hellfest 2025" "2025-06-19" "2025-06-22" "Clisson, France")
EVENT_2=$(create_event "Download Festival 2025" "2025-06-13" "2025-06-15" "Donington Park, UK")
EVENT_3=$(create_event "Wacken Open Air 2025" "2025-07-31" "2025-08-02" "Wacken, Germany")
EVENT_4=$(create_event "Rock am Ring 2025" "2025-06-06" "2025-06-08" "Nürburg, Germany")
EVENT_5=$(create_event "Graspop Metal Meeting 2025" "2025-06-19" "2025-06-22" "Dessel, Belgium")
EVENT_6=$(create_event "Roskilde Festival 2025" "2025-06-28" "2025-07-05" "Roskilde, Denmark")
EVENT_7=$(create_event "Glastonbury Festival 2025" "2025-06-25" "2025-06-29" "Pilton, UK")
EVENT_8=$(create_event "Primavera Sound 2025" "2025-05-29" "2025-06-07" "Barcelona, Spain")
EVENT_9=$(create_event "Tomorrowland 2025" "2025-07-18" "2025-07-27" "Boom, Belgium")
EVENT_10=$(create_event "Rock Werchter 2025" "2025-06-26" "2025-06-29" "Werchter, Belgium")

# Major Music Festivals - USA
EVENT_11=$(create_event "Coachella 2025" "2025-04-11" "2025-04-20" "Indio, California")
EVENT_12=$(create_event "Lollapalooza 2025" "2025-07-31" "2025-08-03" "Chicago, Illinois")
EVENT_13=$(create_event "Bonnaroo 2025" "2025-06-12" "2025-06-15" "Manchester, Tennessee")
EVENT_14=$(create_event "Austin City Limits 2025" "2025-10-03" "2025-10-12" "Austin, Texas")
EVENT_15=$(create_event "Electric Daisy Carnival 2025" "2025-05-16" "2025-05-18" "Las Vegas, Nevada")

# Specialty Metal Festivals
EVENT_16=$(create_event "Bloodstock Open Air 2025" "2025-08-07" "2025-08-10" "Derbyshire, UK")
EVENT_17=$(create_event "Brutal Assault 2025" "2025-08-06" "2025-08-09" "Jaroměř, Czech Republic")
EVENT_18=$(create_event "Summer Breeze 2025" "2025-08-13" "2025-08-16" "Dinkelsbühl, Germany")
EVENT_19=$(create_event "Resurrection Fest 2025" "2025-06-25" "2025-06-28" "Viveiro, Spain")
EVENT_20=$(create_event "Copenhell 2025" "2025-06-18" "2025-06-21" "Copenhagen, Denmark")

# Rock/Alternative Festivals
EVENT_21=$(create_event "Reading Festival 2025" "2025-08-22" "2025-08-24" "Reading, UK")
EVENT_22=$(create_event "Leeds Festival 2025" "2025-08-22" "2025-08-24" "Leeds, UK")
EVENT_23=$(create_event "Pinkpop 2025" "2025-06-07" "2025-06-09" "Landgraaf, Netherlands")
EVENT_24=$(create_event "Rock in Rio 2025" "2025-09-19" "2025-09-28" "Rio de Janeiro, Brazil")
EVENT_25=$(create_event "Fuji Rock Festival 2025" "2025-07-25" "2025-07-27" "Naeba, Japan")

# Electronic Music Festivals
EVENT_26=$(create_event "Ultra Music Festival 2025" "2025-03-28" "2025-03-30" "Miami, Florida")
EVENT_27=$(create_event "Creamfields 2025" "2025-08-28" "2025-08-31" "Daresbury, UK")
EVENT_28=$(create_event "Sensation 2025" "2025-07-05" "2025-07-05" "Amsterdam, Netherlands")
EVENT_29=$(create_event "Awakenings Festival 2025" "2025-06-28" "2025-06-29" "Amsterdam, Netherlands")
EVENT_30=$(create_event "Mysteryland 2025" "2025-08-23" "2025-08-24" "Haarlemmermeer, Netherlands")

# Additional Events
EVENT_31=$(create_event "Download Madrid 2025" "2025-06-27" "2025-06-29" "Madrid, Spain")
EVENT_32=$(create_event "Nova Rock 2025" "2025-06-11" "2025-06-14" "Nickelsdorf, Austria")
EVENT_33=$(create_event "Tons of Rock 2025" "2025-06-25" "2025-06-28" "Oslo, Norway")
EVENT_34=$(create_event "Sweden Rock Festival 2025" "2025-06-04" "2025-06-07" "Sölvesborg, Sweden")
EVENT_35=$(create_event "Louder Than Life 2025" "2025-09-25" "2025-09-28" "Louisville, Kentucky")

echo ""
echo "${BLUE}================================================${NC}"
echo "${BLUE}  Linking Artists to Events${NC}"
echo "${BLUE}================================================${NC}"

# Helper function to link artist to event
link_artist() {
  event_id=$1
  artist_id=$2
  artist_name=$3
  event_name=$4
  
  # Skip if either ID is empty
  if [ -z "$event_id" ] || [ -z "$artist_id" ]; then
    echo "${RED}❌ Skipping - Missing ID (Event: $event_id, Artist: $artist_id)${NC}"
    return
  fi
  
  echo "${YELLOW}🔗 Linking $artist_name to $event_name...${NC}"
  response=$(curl -s -w "\n%{http_code}" -X POST "${BASE_URL}/events/${event_id}/artists/${artist_id}" \
    -H 'accept: */*' -d '')
  
  http_code=$(echo "$response" | tail -n1)
  
  if [ "$http_code" = "201" ] || [ "$http_code" = "200" ] || [ "$http_code" = "204" ]; then
    echo "${GREEN}✅ Linked successfully (HTTP $http_code)${NC}"
  else
    echo "${RED}❌ Failed to link (HTTP $http_code)${NC}"
  fi
}

# Hellfest 2025 - Heavy Metal Focus
link_artist "$EVENT_1" "$ARTIST_1" "Metallica" "Hellfest 2025"
link_artist "$EVENT_1" "$ARTIST_2" "Iron Maiden" "Hellfest 2025"
link_artist "$EVENT_1" "$ARTIST_16" "Slayer" "Hellfest 2025"
link_artist "$EVENT_1" "$ARTIST_17" "Megadeth" "Hellfest 2025"
link_artist "$EVENT_1" "$ARTIST_20" "Black Sabbath" "Hellfest 2025"

# Download Festival 2025 - Rock & Metal
link_artist "$EVENT_2" "$ARTIST_3" "AC/DC" "Download Festival 2025"
link_artist "$EVENT_2" "$ARTIST_4" "Guns N' Roses" "Download Festival 2025"
link_artist "$EVENT_2" "$ARTIST_5" "Foo Fighters" "Download Festival 2025"
link_artist "$EVENT_2" "$ARTIST_25" "Judas Priest" "Download Festival 2025"

# Wacken Open Air 2025 - Metal Heaven
link_artist "$EVENT_3" "$ARTIST_2" "Iron Maiden" "Wacken Open Air 2025"
link_artist "$EVENT_3" "$ARTIST_16" "Slayer" "Wacken Open Air 2025"
link_artist "$EVENT_3" "$ARTIST_18" "Anthrax" "Wacken Open Air 2025"
link_artist "$EVENT_3" "$ARTIST_24" "Deep Purple" "Wacken Open Air 2025"

# Rock am Ring 2025 - Diverse Rock
link_artist "$EVENT_4" "$ARTIST_12" "Muse" "Rock am Ring 2025"
link_artist "$EVENT_4" "$ARTIST_13" "Arctic Monkeys" "Rock am Ring 2025"
link_artist "$EVENT_4" "$ARTIST_14" "The Killers" "Rock am Ring 2025"
link_artist "$EVENT_4" "$ARTIST_26" "Radiohead" "Rock am Ring 2025"

# Graspop Metal Meeting 2025
link_artist "$EVENT_5" "$ARTIST_1" "Metallica" "Graspop Metal Meeting 2025"
link_artist "$EVENT_5" "$ARTIST_19" "Pantera" "Graspop Metal Meeting 2025"
link_artist "$EVENT_5" "$ARTIST_17" "Megadeth" "Graspop Metal Meeting 2025"

# Glastonbury 2025 - Legendary Mix
link_artist "$EVENT_7" "$ARTIST_8" "The Rolling Stones" "Glastonbury 2025"
link_artist "$EVENT_7" "$ARTIST_15" "Coldplay" "Glastonbury 2025"
link_artist "$EVENT_7" "$ARTIST_6" "Red Hot Chili Peppers" "Glastonbury 2025"

# Coachella 2025 - Modern Mix
link_artist "$EVENT_11" "$ARTIST_11" "Imagine Dragons" "Coachella 2025"
link_artist "$EVENT_11" "$ARTIST_31" "Daft Punk" "Coachella 2025"
link_artist "$EVENT_11" "$ARTIST_33" "David Guetta" "Coachella 2025"

# Tomorrowland 2025 - Electronic Focus
link_artist "$EVENT_9" "$ARTIST_31" "Daft Punk" "Tomorrowland 2025"
link_artist "$EVENT_9" "$ARTIST_32" "The Chemical Brothers" "Tomorrowland 2025"
link_artist "$EVENT_9" "$ARTIST_33" "David Guetta" "Tomorrowland 2025"
link_artist "$EVENT_9" "$ARTIST_34" "Calvin Harris" "Tomorrowland 2025"
link_artist "$EVENT_9" "$ARTIST_35" "Tiësto" "Tomorrowland 2025"

# Lollapalooza 2025 - Alternative Rock
link_artist "$EVENT_12" "$ARTIST_27" "The Strokes" "Lollapalooza 2025"
link_artist "$EVENT_12" "$ARTIST_28" "Kings of Leon" "Lollapalooza 2025"
link_artist "$EVENT_12" "$ARTIST_5" "Foo Fighters" "Lollapalooza 2025"

# Primavera Sound 2025
link_artist "$EVENT_8" "$ARTIST_26" "Radiohead" "Primavera Sound 2025"
link_artist "$EVENT_8" "$ARTIST_13" "Arctic Monkeys" "Primavera Sound 2025"
link_artist "$EVENT_8" "$ARTIST_30" "Franz Ferdinand" "Primavera Sound 2025"

# Reading/Leeds 2025
link_artist "$EVENT_21" "$ARTIST_14" "The Killers" "Reading Festival 2025"
link_artist "$EVENT_21" "$ARTIST_27" "The Strokes" "Reading Festival 2025"
link_artist "$EVENT_22" "$ARTIST_14" "The Killers" "Leeds Festival 2025"
link_artist "$EVENT_22" "$ARTIST_27" "The Strokes" "Leeds Festival 2025"

# Bloodstock Open Air 2025 - Pure Metal
link_artist "$EVENT_16" "$ARTIST_25" "Judas Priest" "Bloodstock Open Air 2025"
link_artist "$EVENT_16" "$ARTIST_16" "Slayer" "Bloodstock Open Air 2025"
link_artist "$EVENT_16" "$ARTIST_18" "Anthrax" "Bloodstock Open Air 2025"

# Ultra Music Festival 2025 - EDM
link_artist "$EVENT_26" "$ARTIST_33" "David Guetta" "Ultra Music Festival 2025"
link_artist "$EVENT_26" "$ARTIST_34" "Calvin Harris" "Ultra Music Festival 2025"
link_artist "$EVENT_26" "$ARTIST_35" "Tiësto" "Ultra Music Festival 2025"

# Rock in Rio 2025 - Massive Lineup
link_artist "$EVENT_24" "$ARTIST_4" "Guns N' Roses" "Rock in Rio 2025"
link_artist "$EVENT_24" "$ARTIST_2" "Iron Maiden" "Rock in Rio 2025"
link_artist "$EVENT_24" "$ARTIST_6" "Red Hot Chili Peppers" "Rock in Rio 2025"
link_artist "$EVENT_24" "$ARTIST_11" "Imagine Dragons" "Rock in Rio 2025"

# Additional Festival Lineups
link_artist "$EVENT_32" "$ARTIST_3" "AC/DC" "Nova Rock 2025"
link_artist "$EVENT_32" "$ARTIST_21" "Aerosmith" "Nova Rock 2025"
link_artist "$EVENT_34" "$ARTIST_22" "Van Halen" "Sweden Rock Festival 2025"
link_artist "$EVENT_34" "$ARTIST_23" "Bon Jovi" "Sweden Rock Festival 2025"

# Roskilde Festival 2025 - Mix
link_artist "$EVENT_6" "$ARTIST_5" "Foo Fighters" "Roskilde Festival 2025"
link_artist "$EVENT_6" "$ARTIST_12" "Muse" "Roskilde Festival 2025"
link_artist "$EVENT_6" "$ARTIST_15" "Coldplay" "Roskilde Festival 2025"

# Rock Werchter 2025
link_artist "$EVENT_10" "$ARTIST_6" "Red Hot Chili Peppers" "Rock Werchter 2025"
link_artist "$EVENT_10" "$ARTIST_14" "The Killers" "Rock Werchter 2025"
link_artist "$EVENT_10" "$ARTIST_28" "Kings of Leon" "Rock Werchter 2025"

# Bonnaroo 2025
link_artist "$EVENT_13" "$ARTIST_11" "Imagine Dragons" "Bonnaroo 2025"
link_artist "$EVENT_13" "$ARTIST_27" "The Strokes" "Bonnaroo 2025"
link_artist "$EVENT_13" "$ARTIST_29" "The White Stripes" "Bonnaroo 2025"

# Austin City Limits 2025
link_artist "$EVENT_14" "$ARTIST_6" "Red Hot Chili Peppers" "Austin City Limits 2025"
link_artist "$EVENT_14" "$ARTIST_13" "Arctic Monkeys" "Austin City Limits 2025"
link_artist "$EVENT_14" "$ARTIST_30" "Franz Ferdinand" "Austin City Limits 2025"

# Electric Daisy Carnival 2025
link_artist "$EVENT_15" "$ARTIST_32" "The Chemical Brothers" "Electric Daisy Carnival 2025"
link_artist "$EVENT_15" "$ARTIST_34" "Calvin Harris" "Electric Daisy Carnival 2025"
link_artist "$EVENT_15" "$ARTIST_35" "Tiësto" "Electric Daisy Carnival 2025"

# Brutal Assault 2025
link_artist "$EVENT_17" "$ARTIST_16" "Slayer" "Brutal Assault 2025"
link_artist "$EVENT_17" "$ARTIST_17" "Megadeth" "Brutal Assault 2025"
link_artist "$EVENT_17" "$ARTIST_19" "Pantera" "Brutal Assault 2025"

# Summer Breeze 2025
link_artist "$EVENT_18" "$ARTIST_18" "Anthrax" "Summer Breeze 2025"
link_artist "$EVENT_18" "$ARTIST_20" "Black Sabbath" "Summer Breeze 2025"
link_artist "$EVENT_18" "$ARTIST_25" "Judas Priest" "Summer Breeze 2025"

# Resurrection Fest 2025
link_artist "$EVENT_19" "$ARTIST_1" "Metallica" "Resurrection Fest 2025"
link_artist "$EVENT_19" "$ARTIST_2" "Iron Maiden" "Resurrection Fest 2025"
link_artist "$EVENT_19" "$ARTIST_4" "Guns N' Roses" "Resurrection Fest 2025"

# Copenhell 2025
link_artist "$EVENT_20" "$ARTIST_17" "Megadeth" "Copenhell 2025"
link_artist "$EVENT_20" "$ARTIST_24" "Deep Purple" "Copenhell 2025"
link_artist "$EVENT_20" "$ARTIST_25" "Judas Priest" "Copenhell 2025"

# Pinkpop 2025
link_artist "$EVENT_23" "$ARTIST_3" "AC/DC" "Pinkpop 2025"
link_artist "$EVENT_23" "$ARTIST_8" "The Rolling Stones" "Pinkpop 2025"
link_artist "$EVENT_23" "$ARTIST_21" "Aerosmith" "Pinkpop 2025"

# Fuji Rock Festival 2025
link_artist "$EVENT_25" "$ARTIST_26" "Radiohead" "Fuji Rock Festival 2025"
link_artist "$EVENT_25" "$ARTIST_13" "Arctic Monkeys" "Fuji Rock Festival 2025"
link_artist "$EVENT_25" "$ARTIST_12" "Muse" "Fuji Rock Festival 2025"

# Creamfields 2025
link_artist "$EVENT_27" "$ARTIST_31" "Daft Punk" "Creamfields 2025"
link_artist "$EVENT_27" "$ARTIST_33" "David Guetta" "Creamfields 2025"
link_artist "$EVENT_27" "$ARTIST_34" "Calvin Harris" "Creamfields 2025"

# Sensation 2025
link_artist "$EVENT_28" "$ARTIST_32" "The Chemical Brothers" "Sensation 2025"
link_artist "$EVENT_28" "$ARTIST_35" "Tiësto" "Sensation 2025"

# Awakenings Festival 2025
link_artist "$EVENT_29" "$ARTIST_31" "Daft Punk" "Awakenings Festival 2025"
link_artist "$EVENT_29" "$ARTIST_32" "The Chemical Brothers" "Awakenings Festival 2025"

# Mysteryland 2025
link_artist "$EVENT_30" "$ARTIST_33" "David Guetta" "Mysteryland 2025"
link_artist "$EVENT_30" "$ARTIST_34" "Calvin Harris" "Mysteryland 2025"
link_artist "$EVENT_30" "$ARTIST_35" "Tiësto" "Mysteryland 2025"

# Download Madrid 2025
link_artist "$EVENT_31" "$ARTIST_1" "Metallica" "Download Madrid 2025"
link_artist "$EVENT_31" "$ARTIST_4" "Guns N' Roses" "Download Madrid 2025"
link_artist "$EVENT_31" "$ARTIST_5" "Foo Fighters" "Download Madrid 2025"

# Tons of Rock 2025
link_artist "$EVENT_33" "$ARTIST_2" "Iron Maiden" "Tons of Rock 2025"
link_artist "$EVENT_33" "$ARTIST_16" "Slayer" "Tons of Rock 2025"
link_artist "$EVENT_33" "$ARTIST_19" "Pantera" "Tons of Rock 2025"

# Louder Than Life 2025
link_artist "$EVENT_35" "$ARTIST_3" "AC/DC" "Louder Than Life 2025"
link_artist "$EVENT_35" "$ARTIST_20" "Black Sabbath" "Louder Than Life 2025"
link_artist "$EVENT_35" "$ARTIST_24" "Deep Purple" "Louder Than Life 2025"

echo ""
echo "${GREEN}================================================${NC}"
echo "${GREEN}  ✨ Database initialization completed! ✨${NC}"
echo "${GREEN}================================================${NC}"
echo ""
echo "${BLUE}📊 Summary:${NC}"
echo "  • Artists created: 35"
echo "  • Events created: 35"
echo "  • Artist-Event links: 100+"
echo ""
echo "${BLUE}🎸 Featured Artists:${NC}"
echo "  Rock Legends: The Rolling Stones, Led Zeppelin, Pink Floyd, Queen"
echo "  Metal Icons: Metallica, Iron Maiden, Slayer, Megadeth"
echo "  Modern Rock: Foo Fighters, Muse, Arctic Monkeys, The Killers"
echo "  Electronic: Daft Punk, David Guetta, Calvin Harris, Tiësto"
echo ""
echo "${BLUE}🎪 Featured Festivals:${NC}"
echo "  Europe: Hellfest, Download, Wacken, Glastonbury, Tomorrowland"
echo "  USA: Coachella, Lollapalooza, Bonnaroo, EDC Las Vegas"
echo "  Specialty: Bloodstock, Brutal Assault, Ultra Music Festival"
echo ""
echo "${BLUE}🌐 Access the application:${NC}"
echo "  • Frontend: ${YELLOW}http://localhost:5173${NC}"
echo "  • Backend API: ${YELLOW}http://localhost:8080${NC}"
echo "  • Swagger UI: ${YELLOW}http://localhost:8080/swagger-ui.html${NC}"
echo ""

# Create a completion flag file
touch /tmp/init-complete
echo "${GREEN}✅ Init completion flag created at /tmp/init-complete${NC}"

# Create a completion flag file
touch /tmp/init-complete
echo "${GREEN}✅ Init completion flag created at /tmp/init-complete${NC}"