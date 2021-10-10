# The script requires arguments for original (FIND) and new (REPLACE) custom theme names
# cd into the root level of the project and run the script custom-theme.sh FIND REPLACE
# Ex. scripts/custom-theme.sh tofu yowza

if [ -z "$1" ] || [ -z "$2" ]; then
  echo "Usage: ./$0 [find string] [replace string]"
  exit 1
fi

FIND=$1
REPLACE=$2

#needed for byte sequence error in ascii to utf conversion on OSX
export LC_CTYPE=C;
export LANG=C;

# find and replace within files
#sed -i "" is needed by the OSX version of sed (instead of sed -i)
cd web/themes/custom
find . -type f -exec sed -i "" "s|${FIND}|${REPLACE}|g" {} +
# rename theme folder name (the rename utility is required and can be downloaded with homebrew: brew install rename)
rename -vs ${FIND} ${REPLACE} *
# rename file names too
cd ${REPLACE}
find . -exec rename "s|${FIND}|${REPLACE}|g" {} +

exit 0
